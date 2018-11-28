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

## Open Source Discrepancy Notice
The source code found in this repository uses the Tableau UI components library. However, due to a bug in the current version of Qt used in Tableau Desktop, html selects do not allow for mouse selection on Mac and instead require the keyboard for selections. Because of this we will be using an alternative div dropdown in the production bundle until we are able to upgrade Qt.