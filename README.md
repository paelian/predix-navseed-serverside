# Quick start - Predix UI Development in NodeJS for Professional Services

### Contents

1. [Software Needed](#software-needed)
2. [Example Service - Predix Asset and UAA](#example-services)
3. [The Simplified UI 'navseed' Application](#navseed)
4. [Additonal Resources](additional-resources)



### Assumptions

  * a predix.io account has been obtained by the reader
  * all relevant credentials to specific workspaces have been given to the reader's predix.io account
  * the reader has some familiarity with Javascript and/or NodeJS, as well as web-based technologies such as Express web server, REST, and HTML
  * the reader is familiar with object-oriented software development techniques
  * there will be instances where GE networking (proxies) will 'get in the way' of proper operation; this guide assumes the reader is able to work around/with their proxy settings in order to accomodate communications to/from external resources (git, npm, bower, predix.io) and where applicable, internal git repositories as well

***


<a name="software-needed"></a>
## 1. Software Needed

__Required__

  * [NodeJS](https://nodejs.org/)
  * [Cloud Foundry CLI](https://github.com/cloudfoundry/cli)
  * [git](https://git-scm.com/downloads)

__Recommended__

  * [Visual Studio Code](https://code.visualstudio.com/). It has integrated debugging tools, git repo management, and terminal.

***


<a name="example-services"></a>
## 2. Example Service - Predix Asset and UAA

In order to better understand the mechanics of how the navseed starter application functions with Predix services, it helps to have a service to leverage; to this end, this section deals with how to quickly set up a sample development environment with Predix Asset and UAA (user access) services.

### Create UAA Service Instance

Begin by logging in to predix.io using previously-obtained credentials, and access your dev space. Go to the "Service Instances" tab and click the view catalog link.

![alt text](/README.img/README%20(2).png "Browse service catalog")

Select "User Account and Authentication". For the purposes of this demonstration, select the 'Free' plan and click the subscribe button.

![alt text](/README.img/README%20(3).png "Select 'User Account and Authentication'")

At this point, you should be presented with a configuration wizard for the new service instance you are creating. Fill out the details as appropriate (use your own parameters, the settings presented in the image below serve merely as an example!). From this point onwards, it is __*highly recommended*__ that you take a screenshot of each configuration screen as you fill them out so you have a reference guide for future use!!

![alt text](/README.img/README%20(5).png "Select 'User Account and Authentication'")

Once the UAA service instance has been created, you will need to log in to it in order to create a client account the navseed service will use to access the asset service instance. For now, skip opening the UAA service until after the asset service instance has been created.

### Create Predix Asset Service Instance

__First, a note about client credentials:__ Predix service instances generally all require token access granted by an authorized UAA service instance. In the previous step, this document described the creation of a client credential; for development purposes, this is an appropriate measure to take if there is no user base developed, or if access control services (ACS) has not yet been implemented. Client credentials are also appropriate if you are developing a headless microservice that draws from one or more Predix service instances to perform its function. In either case, __the scope of this document is restricted to using client credentials for simplicity__.

Head back to the catalog listing of services and locate the "Asset" service under "Data Management".

![alt text](/README.img/README%20(9).png "Select 'Asset'")

As with the UAA service instance, for the purposes of this demonstration, select the "Free" plan and click the subscribe button.

On the asset service creation configuration page, ensure the UAA service created in the previous step is selected, and provide a unique name to your new asset service instance. Click "Create Service" when you are satisfied with your new service instance name.

![alt text](/README.img/README%20(11).png "Asset service instance configuration")

At this point, a new client credential is required for the navseed application to access your new Predix asset service instance, so from the "Space" panel, select your UAA service instance.

![alt text](/README.img/README%20(12).png "Select UAA service instance")

After logging in to the UAA service instance (you took a screenshot of your admin secret password right?), select the "Manage Clients" link.

![alt text](/README.img/README%20(13).png "Select 'Manage Clients'")

From the "Client Management" screen, select "Create Client".

![alt text](/README.img/README%20(14).png "Select 'Create Client'")

As with the UAA service instance creation, it is important at this point to take a screenshot of your configuration. A useful tip is to also edit the screenshot to add in the client secret, as it will be hidden by default. Use your own client secret ID, as the one shown in the example below is only for demonstration purposes.

![alt text](/README.img/README%20(15).png "Create client ID in UAA 1")

![alt text](/README.img/README%20(16).png "Create client ID in UAA 2")

Once you click the "Save" button to create the client ID, select the new ID back on the "Client Management screen" and select the asset service instance from the "Authorized Services" selector. Click "Submit".

![alt text](/README.img/README%20(17).png "Assign asset service instance access to client ID")

Your Predix Asset service instance and UAA service instace are ready for use with the navseed application!

***


<a name="navseed"></a>
## 3. The Simplified UI 'navseed' Application

The Predix simplified navseed application is located [here](https://github.com/paelian/predix-navseed-serverside).

### Architecture

The simplified application, called 'navseed' due to the inclusion and example implementation of the Predix-UI control [px-app-nav](https://www.predix-ui.com/#/elements/px-app-nav), provides a very light starting point for Predix UI development. While there are still some server-side features present similar to what you might find in other seed apps, some effort has been given to reorganize these features to follow a typical MVC pattern.

(more architecture details forthcoming)

### Wiring Up Predix Asset

The first step in utilizing the Predix Asset and UAA service instances added to the dev space in section 2 is to tell the application to bind to the service instances. This is done via the "manifest.yml" file, located in the application root. __*Also ensure that you provide a unique name to your application, as this will likely cause a routing conflict if you do not!*__ The name of the application, as it exists in the Predix CF environment, is also in the manifest.yml file as shown below.

![alt text](/README.img/README%20(20).png "Bind service instances to navseed application")

Open a console window at the applicaton root and run `cf login` to log in to your Predix environment. Note that your options may be different than the options presented in the example; you should log in to the same Space as your Predix Asset instance created in section 2.

![alt text](/README.img/README%20(21).png "Log in to Predix CF")

Next, run `npm install` and `bower install` from the console, again in the application root. "npm" retrieves all the server-side dependencies required by the navseed application to function, while "bower" retrieves all the browser-side controls and dependent libraries. A list of each set of dependencies can be recovered from the "package.json" and "bower.json" files for npm and bower, respectively.

![alt text](/README.img/README%20(22).png "npm install")

![alt text](/README.img/README%20(24).png "bower install")
 
At this stage, we need to create a distribution folder for uploading to the Predix CF environment. Issue a `gulp dist` command from the application root in the console (this will execute the "dist" task found in the "gulpfile.js" file).

![alt text](/README.img/README%20(25).png "gulp dist")

Initiate a `cf push` command from the application root to begin the distribution upload.

![alt text](/README.img/README%20(26).png "cf push")

Once the `cf push` command has completed, you should see that your application is running. If you do not, you can retrieve the most recent logs from the application in the server environment by running `cf logs <app-name> --recent`. Otherwise, you should see something similar to the following.

![alt text](/README.img/README%20(27).png "cf push successful")

__*Note that the uri to the application front end should be apparent from the screen presented above as well!*__ Copy this uri and prefix it with `https://` and paste it somewhere safe - this is the main address to your application.

*So far we have installed the dependencies, packaged the application files into a distribution and uploaded it to the cloud. However, we still need to capture the service instance bindings and configure the seed to use them! It might seem strange that we have uploaded an "unfinished" application, but this was so that we could tease out the service instance bindings in a useful format!*

From the application root in console, execute `cf env <your-app-name>`. You should see the command return a poorly-formatted json string, along with some other information. The information you will need is highlighted below (again, the information will be unique to your application and service instances - the details shown below are for illustration only).

![alt text](/README.img/README%20(29).png "cf env")

Copy the string from the console into a new file you will need to make. Save this file as "cf.json", located in the "server" subfolder in the application. Open this file and look at the two json configurations, there should be one for "predix-asset" and another for "predix-uaa".

Next step is to add the client credentials for predix-asset and for predix-uaa. These credentials are the same as you set them up to be in section 2.

![alt text](/README.img/README%20(30).png "Add client credentials to cf.json 1")

![alt text](/README.img/README%20(31).png "Add client credentials to cf.json 2")

*Author's note: It should definitely be mentioned at this point that there are other ways to encrypt these credentials so as not to make them quite so obvious (base64). Once the application is more fully developed, this would certainly be a recommended step. For the time being however, it is outside the scope of this document, as the intent of this document is to provide only a place to start building your application. I have found it more useful to keep the configuration details intact and exposed during development so I had a easy point of reference and could respond to changes immediately if required. Also, if you have to switch tasks for an extended period of time during development, it is helpful to have everything written down!*

(more forthcoming)








***


<a name="additional-resources"></a>
## 4. Additional Resources

 * [Predix-ui](https://www.predix-ui.com). Locate and use many different Predix UI via this site; components are installed via `bower install px-<desired-controlId-here>` from the console in the root of the navseed application.
 * [gulp](https://gulpjs.com/). Gulp is a powerful task runner that can watch your application code for changes as you make them, restarting the node server thread as needed. It is also used to package the application into a distribution folder for easy uploading to Predix CF.


