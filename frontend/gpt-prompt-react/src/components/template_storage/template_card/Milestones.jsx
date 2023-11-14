import React from "react";
import { Grid, Tooltip, Chip } from "@mui/material";

const Milestones = ({ milestones, handleVersionClick }) => {
  return (
    <Grid container alignItems="center">
      {milestones.map((milestone, index) => (
        <Grid item key={index}>
          <Tooltip
            title={
              <div>
                <p>Average Rating: {milestone.rating}</p>
                <p>Times Used: {milestone.timesUsed}</p>
              </div>
            }
          >
            <Chip
              label={milestone.version}
              color="primary"
              onClick={() => handleVersionClick(milestone.version)}
            />
          </Tooltip>
        </Grid>
      ))}
    </Grid>
  );
};

export default Milestones;

