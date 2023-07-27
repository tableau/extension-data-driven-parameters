[![As-Is](https://img.shields.io/badge/Support%20Level-As--Is-e8762c.svg)](https://www.tableau.com/support-levels-it-and-developer-tools)

# Data-Driven Parameters
This extension allows you to add a parameter to a Tableau dashboard whose domain is based on your data. Added a new product line? Expanding to new regions? No longer do you need to manually edit the parameter to update it, with this extension your parameter values update automatically!

## Using the Extension from Tableau Exchange (Recommended)
See the Tableau Help topic [Use Dashboard Extensions](https://help.tableau.com/current/pro/desktop/en-us/dashboard_extensions.htm) for directions. When presented with the list of available Dashboard Extensions, search for Data Driven Parameters to find and install this one.

### Using the Extension
1. Create a parameter that accepts all values (no lists or ranges), make sure it has a data type matching the field you want to use to populate it.
2. Drag in a new Extension object to your dashboard and click "My Extensions"
3. Find the manifest (.trex) file you downloaded above.
4. In the pop-up configuration window select the parameter you created above for the extension to manipulate.
5. Select the worksheet that holds the field you want to base your parameter on.
6. Select the field you want to base your parameter on.
7. Optional: Configure the options and formatting settings.
8. Click 'OK'.

## Download the Extension Code to Develop Locally
If you want to use a locally-built version of this extension or if you want to make any of your own changes, follow these steps:

1. Make sure you have [Node.js](https://nodejs.org) and [Yarn](https://yarnpkg.com) installed. 
2. Clone or download and unzip this repository. Open the command line to the `extension-data-driven-parameters-master` folder and run `yarn` to install the node modules.
3. Edit the `homepage` in the `package.json` file to the server where you are going to host the extension. For example:
```
"homepage": "http://localhost:8080",
```
4. In the command line run `yarn build` to build the extension with the new homepage.
5. Copy the files in `build` to your web server at the path you specified in Step 3.
6. Update the existing or create a new manifest file (.trex) to point to the URL where you are hosting the extension with `/#/parameter` at the end. For example: `http://localhost:8080/#/parameter`. 

## Support
Tableau customers can contact the Tableau Support team for help.

For any local build or code related questions, please post to the [Issues](https://github.com/tableau/extension-data-driven-parameters/issues) tab here for community support.

### Mac Desktop 2018.3 and lower
Note: Please use arrow keys and 'Enter' to select dropdown options.
