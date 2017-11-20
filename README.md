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

<img src="/README.img/README$20(2).png" alt="Browse service catalog" />

Select "User Account and Authentication". For the purposes of this demonstration, select the 'Free' plan and click the subscribe button.

![alt text](/README.img/README%20(3).png "Select 'User Account and Authentication'")



***


<a name="navseed"></a>
## 3. The Simplified UI 'navseed' Application

(A brief overview of the seed - where to find it, the architecture - followed by a concrete example how to set it up to work with the asset service set up in step 2)

***


<a name="additional-resources"></a>
## 4. Additional Resources

(Training videos - mostly pluralsight - and online books)


