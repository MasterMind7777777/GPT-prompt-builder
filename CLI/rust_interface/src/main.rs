use reqwest;
use std::process::Command;
use std::fs;
use std::io::{self, Write};
use tempfile::NamedTempFile;
use crossterm::{
    cursor::{MoveTo, Show, Hide},
    style::Print,
    terminal::{self, Clear, ClearType},
    event::{read, Event, KeyCode, KeyEvent},
    ExecutableCommand,
};


#[tokio::main]
async fn main() {

    match get_user_input("Do you want to create a new template part? (y/N): ").unwrap().as_str() {
        "Y" | "y" => {
            if let Ok(temp_file) = create_temp_file() {
                let file_path = temp_file.path().to_str().unwrap().to_string();
                if open_editor(&file_path).is_ok() {
                    // Read the content from the temporary file
                    let content = fs::read_to_string(&file_path).expect("Unable to read the file");

                    // Get part_type and order from the user
                    
                    // Define your choices for part_type
                    let part_types = vec!["Title", "Body", "Footer"];

                    // Use the generic function to get the part_type
                    let part_type = get_user_choice("Choose the type of the template part:", &part_types).unwrap();
                    println!("You selected: {}", part_type);
                    let order_str = get_user_input("Enter the order: ").unwrap();
                    let order: u32 = order_str.parse().expect("Order should be a number");

                    // Create the template part using the API
                    if let Err(e) = create_template_part(&content, &part_type, order).await {
                        eprintln!("Failed to create template part: {:?}", e);
                    }
                }
            }
        }
        _ => println!("No template part created."),
    }
}

#[derive(Debug)]
enum HttpError {
    HttpRequestError(reqwest::Error),
    HttpResponseError(reqwest::StatusCode),
    // Add other error types as needed
}

async fn create_template_part(content: &str, part_type: &str, order: u32) -> Result<(), HttpError> {
    let api_url = "http://127.0.0.1:8000/api/v0/prompt_templates/template-parts/";
    let client = reqwest::Client::new();
    let response = client.post(api_url)
        .form(&[
            ("content", content),
            ("type", part_type),
            ("order", &order.to_string()) // Convert u32 to String
        ])
        .send()
        .await;

    match response {
        Ok(response) => {
            // Check if the status is a success
            if response.status().is_success() {
                println!("Template part created successfully");
                Ok(())
            } else {
                // If the status is not successful, try to read the body to get more information
                let status = response.status();
                let body = response.text().await.unwrap_or_else(|_| "Failed to read error message".to_string());
                println!("Failed to create template part: Status {}, Error: {}", status, body);
                Err(HttpError::HttpResponseError(status))
            }
        },
        Err(error) => {
            // Handle other types of errors here (timeouts, connection issues, etc.)
            println!("Failed to create template part: {}", error);
            Err(HttpError::HttpRequestError(error))
        },
    }
}


fn open_editor(file_path: &str) -> std::io::Result<String> {
    let editor = std::env::var("EDITOR").unwrap_or_else(|_| "nvim".to_string());
    Command::new(editor)
        .arg(file_path)
        .status()?;
    
    std::fs::read_to_string(file_path)
}

fn create_temp_file() -> std::io::Result<NamedTempFile> {
    NamedTempFile::new()
}

fn get_user_input(prompt: &str) -> std::io::Result<String> {
    print!("{}", prompt);
    io::stdout().flush()?;
    let mut input = String::new();
    io::stdin().read_line(&mut input)?;
    Ok(input.trim().to_string())
}

fn get_user_choice(prompt: &str, options: &[&str]) -> std::io::Result<String> {
    terminal::enable_raw_mode()?;

    let mut current_index = 0;
    let mut stdout = io::stdout();

    // Hide cursor to avoid flickering during redraw
    stdout.execute(Hide)?;

    loop {
        // Move the cursor back to the top to redraw the menu
        stdout.execute(MoveTo(0, 0))?;

        // Clear the screen from the current cursor position down
        stdout.execute(Clear(ClearType::FromCursorDown))?;

        println!("{}", prompt);
        // Print each option, resetting the cursor to the start of the line each time
        for (index, option) in options.iter().enumerate() {
            stdout.execute(MoveTo(0, index as u16 + 1))?; // Move cursor down for each option
            if index == current_index {
                stdout.execute(Print(format!("> {}\n", option)))?;
            } else {
                stdout.execute(Print(format!("  {}\n", option)))?;
            }
        }

        stdout.flush()?;

        match read()? {
            Event::Key(KeyEvent { code: KeyCode::Char('j'), .. }) => {
                current_index = (current_index + 1) % options.len();
            },
            Event::Key(KeyEvent { code: KeyCode::Char('k'), .. }) => {
                current_index = if current_index == 0 { options.len() - 1 } else { current_index - 1 };
            },
            Event::Key(KeyEvent { code: KeyCode::Enter, .. }) => {
                // Show cursor before leaving
                stdout.execute(Show)?;
                terminal::disable_raw_mode()?;
                return Ok(options[current_index].to_string());
            },
            Event::Key(KeyEvent { code: KeyCode::Char('q'), .. }) => {
                // Show cursor before leaving
                stdout.execute(Show)?;
                terminal::disable_raw_mode()?;
                break;
            },
            _ => {}
        }
    }

    // Show cursor before exiting in case of an error
    stdout.execute(Show)?;
    terminal::disable_raw_mode()?;
    Err(std::io::Error::new(std::io::ErrorKind::Other, "Selection cancelled"))
}
