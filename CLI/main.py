import os
import subprocess
import tempfile
import requests

API_URL = "http://127.0.0.1:8000/api/v0/prompt_templates/template-parts/"

def open_editor(content=''):
    editor = os.environ.get('EDITOR', 'nvim')  # Use 'nvim' or fall back to 'vim'
    with tempfile.NamedTemporaryFile(suffix=".tmp", mode='r+') as tmpfile:
        if content:
            tmpfile.write(content)
            tmpfile.flush()
        subprocess.call([editor, tmpfile.name])

        # After the editor is closed, read the content
        tmpfile.seek(0)
        return tmpfile.read()

def create_template_part(content, part_type, order):
    data = {
        'content': content,
        'type': part_type,
        'order': order
    }
    response = requests.post(API_URL, data=data)
    if response.status_code == 201:
        print("Template part created successfully")
        return response.json()['id']  # Assuming the API returns the ID of the created object
    else:
        print("Failed to create template part")
        print(response.text)
        return None

def fetch_template_parts():
    response = requests.get(API_URL)
    if response.status_code == 200:
        return response.json()  # Assuming the API returns a list of template parts
    else:
        print("Failed to fetch template parts")
        return []

def select_template_part_with_fzf(template_parts):
    # Create a list of strings to pass to fzf
    choices = [f"{part['id']}: {part['type']} - {part['content'][:50]}" for part in template_parts]
    # Run fzf and capture the output
    process = subprocess.run(['fzf'], input="\n".join(choices), text=True, stdout=subprocess.PIPE)
    selected = process.stdout.strip()
    # Extract the ID from the selection
    return selected.split(':')[0]

def main():
    template_parts = fetch_template_parts()
    
    # Decide whether to create a new template part or edit an existing one
    choice = input("Do you want to (C)reate a new template part or (E)dit an existing one? [C/E] ").strip().upper()
    if choice == 'E':
        template_part_id = select_template_part_with_fzf(template_parts)
        if not template_part_id:
            print("No template part selected.")
            return
        # Fetch and open the selected template part for editing
        response = requests.get(f"{API_URL}{template_part_id}/")
        if response.status_code != 200:
            print("Failed to fetch the selected template part")
            return
        template_part = response.json()
        updated_content = open_editor(template_part['content'])
        # Update the template part with the new content
        response = requests.put(f"{API_URL}{template_part_id}/", data={'content': updated_content, 'type': template_part['type'], 'order': template_part['order']})
        if response.status_code == 200:
            print("Template part updated successfully")
        else:
            print("Failed to update template part")
            print(response.text)
    elif choice == 'C':
        # Open a new empty editor to create a new template part
        new_content = open_editor()
        part_type = input("Enter the type (Title, Body, Footer): ")
        order = input("Enter the order: ")
        create_template_part(new_content, part_type, order)
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
