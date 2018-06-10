import React from 'react';
import { FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap'

export default class ImageUpload extends React.Component {
	render(){
		const { preview } = this.props;

		return (
			<FormGroup>
			   	<ControlLabel>Image</ControlLabel>
			    <FormControl
					id="formControlsFile"
				    type="file"
				    label="File"
				    help="Example block-level help text here."
				    onChange={this.onChange}
			    />
				{preview && <img width="100px" src={preview}/>}  
			</FormGroup>
		);
	}

	onChange = e => {
		const file = e.target.files[0];
		
		this.props.onFileChanged(file);
	}
}
