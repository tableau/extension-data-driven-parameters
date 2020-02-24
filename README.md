# Data-Driven Parameters
This extension allows you to add a parameter to a Tableau dashboard whose domain is based on your data. Added a new product line? Expanding to new regions? No longer do you need to manually edit the parameter to update it, with this extension your parameter values update automatically!

## How to use an Extension
Download the Data-Driven Parameter [manifest file](https://extensiongallery.tableau.com/products/27). Open Tableau Desktop 2018.2 or higher, drag in the "Extension" object to a dashboard. Click "My Extensions" and find the manifest file (.trex) you downloaded above.

## Using the Data-Driven Parameter Extension
1. Create a parameter that accepts all values (no lists or ranges), make sure it has a data type matching the field you want to use to populate it.
2. Drag in a new Extension object to your dashboard and click "My Extensions"
3. Find the manifest (.trex) file you downloaded above.
4. In the pop-up configuration window select the parameter you created above for the extension to manipulate.
5. Select the worksheet that holds the field you want to base your parameter on.
6. Select the field you want to base your parameter on.
7. Optional: Configure the options and formatting settings.
8. Click 'OK'.

## How to install for local use
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
If you have questions about the extension or found a bug please open a new [issue](https://github.com/tableau/extension-data-driven-parameters/issues).


### Mac Desktop 2018.3 and lower
Note: Please use arrow keys and 'Enter' to select dropdown options.
