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

Head back to the catalog listing of services and locate the "Asset" service under "Data Management".

![alt text](/README.img/README%20(9).png "Select 'Asset'")

As with the UAA service instance, for the purposes of this demonstration, select the "Free" plan and click the subscribe button.

On the asset service creation configuration page, ensure the UAA service created in the previous step is selected, and provide a unique name to your new asset service instance. Click "Create Service" when you are satisfied with your new service instance name.

![alt text](/README.img/README%20(11).png "Asset service instance configuration")

At this point, a new client credential is required for the navseed application to access your new Predix asset service instance, so from the "Sapce" panel, select your UAA service instance.

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

(A brief overview of the seed - where to find it, the architecture - followed by a concrete example how to set it up to work with the asset service set up in step 2)

***


<a name="additional-resources"></a>
## 4. Additional Resources

(Training videos - mostly pluralsight - and online books)


