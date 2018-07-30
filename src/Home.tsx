import * as React from 'react';
import './home.css';

class Home extends React.Component<any, any> {
    public render() {
        return (
			<React.Fragment>
				<div className='icontainer'>
					<div className='box'>
						<div className='left'>
							<h1 className='iheader'>Data-Driven Parameters</h1>
							<span className='tagline'>Automatically update your parameters based on your data!</span>
						</div>
						<div className='right'>
							<h4 className='big'>What is it?</h4>
							<p>This extension allows you to add a parameter to a Tableau dashboard whose domain is based on your data. Added a new product line? No longer do you need to manually edit the parameter to update it, with this extension your parameter values
							update automatically!</p>
							<h4 className='big'>Using the Extension</h4>
							<ol>
								<li>Create an open input (All) parameter with a data type matching the field you want to use to populate it.</li>
								<li>Drag in a new Extension object to your dashboard.</li>
								<li>Find the manifest (.trex) file you downloaded above.</li>
								<li>Select the parameter you created above for the extension to manipulate.</li>
								<li>Select the worksheet that holds the field you want to base your parameter on.</li>
								<li>Select the field you want to base your parameter on.</li>
								<li>Optional: Configure your text and background colors.</li>
								<li>Click 'OK'.</li>
							</ol>
							<p><b>Note:</b> You can add as many instances of this extension as you like!</p>
							<div className='gh'>
								Get this extension and more in the <a href='https://extensiongallery.tableau.com/'>Extension Gallery</a>.
								{/* <a href='https://github.com/tableau/extension-data-driven-parameters'>View on GitHub</a> */}
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
        );
    }
}

export default Home;