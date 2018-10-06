import React, { Component } from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Chip from "@material-ui/core/Chip";

const styles = theme => ({
	bar: {
		padding: "16px 10%",
		[theme.breakpoints.down("sm")]: {
			padding: theme.spacing.unit * 1
		}
	}
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250
		}
	}
};

class AddImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: "",
			location: "",
			tags: [],
			imageURL: "",
			imageLink: ""
		};
	}

	onChange = e => {
		this.setState({ [e.target.name]: e.target.value });
	};

	handleUploadImage = e => {
		e.preventDefault();

		const data = new FormData();
		data.append("file", this.state.imageLink);
		data.append("filename", this.state.imageLink.filename);

		console.log(this.state);
		// axios
		// 	.post("upload", data)
		// 	.then(function(response) {})
		// 	.catch(function(error) {
		// 		console.log(error);
		// 	});
	};

	imageAdded = e => {
		console.log(URL.createObjectURL(e.target.files[0]));
		this.setState({ imageLink: e.target.files[0] });
	};

	handleChange = event => {
		this.setState({ tags: event.target.value });
	};

	render() {
		const { classes, theme } = this.props;

		console.log(theme);
		let imgLink = "";
		if (this.state.imageLink)
			imgLink = URL.createObjectURL(this.state.imageLink);

		const names = [
			"Oliver Hansen",
			"Van Henry",
			"April Tucker",
			"Ralph Hubbard",
			"Omar Alexander",
			"Carlos Abbott",
			"Miriam Wagner",
			"Bradley Wilkerson",
			"Virginia Andrews",
			"Kelly Snyder"
		];

		return (
			<div className={classes.bar}>
				<FormControl
					style={{ display: "flex", flexFlow: "column", flex: 1 }}
					onSubmit={this.handleUploadImage}
				>
					<div style={{ minWidth: 400, minHeight: 300 }}>
						<img
							style={{ width: 400, minWidth: 400 }}
							src={imgLink}
							alt="not found yet"
						/>
					</div>
					<input
						accept="image/*"
						style={{ display: "none" }}
						id="raised-button-file"
						multiple
						type="file"
						onChange={this.imageAdded}
					/>
					<label htmlFor="raised-button-file">
						<Button style={{ width: 200 }} variant="raised" component="span">
							Upload
						</Button>
					</label>
					<TextField
						required
						label="Title"
						name="title"
						className={classes.textField}
						margin="normal"
						onChange={this.onChange}
					/>
					<TextField
						required
						label="Location"
						name="location"
						className={classes.textField}
						margin="normal"
						onChange={this.onChange}
					/>
					<FormControl className={classes.formControl}>
						<InputLabel htmlFor="select-multiple-chip">Chip</InputLabel>
						<Select
							multiple
							value={this.state.tags}
							onChange={this.handleChange}
							input={<Input id="select-multiple-chip" />}
							renderValue={selected => (
								<div className={classes.chips}>
									{selected.map(value => (
										<Chip key={value} label={value} className={classes.chip} />
									))}
								</div>
							)}
							MenuProps={MenuProps}
						>
							{names.map(name => (
								<MenuItem
									key={name}
									value={name}
									style={{
										fontWeight:
											this.state.tags.indexOf(name) === -1
												? theme.typography.fontWeightRegular
												: theme.typography.fontWeightMedium
									}}
								>
									{name}
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Button
						style={{ width: 200 }}
						type="submit"
						variant="raised"
						component="span"
						onClick={this.handleUploadImage}
					>
						Submit
					</Button>
				</FormControl>
			</div>
		);
	}
}

export default withStyles(styles, { withTheme: true })(AddImage);
