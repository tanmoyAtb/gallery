import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    
    bar: {
      padding: '0 10%',
      [theme.breakpoints.down('sm')]: {
          padding: theme.spacing.unit *1,
      },
    }
  });

class LandingPage extends Component {
	render() {
        const {classes} = this.props;

		return (
			<div className={classes.bar}>
				LandingPage
				<div style={{ display: "flex" }}>
					<div style={{ flex: 1 }} />
					<div>
						<Button
                            href="/add"
							variant="outlined"
							color="primary"
						>
							Add new image
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(LandingPage);
