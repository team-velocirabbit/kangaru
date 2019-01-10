# KANGARU-ETL

Set up and run custom ETL (Extract, Transform, Load) tasks.
Kargaru-ETL is a user-friendly, cross-platform Electron application designed to utilize the RxJS-ETL library. RxJS-ETL is a modular platform built with RxJS observables that allow developers to create stream-based ETL pipelines. The platform offers additional capabilities such as buffering, bulk insertions, notifications upon task completion, job scheduling, and the establishment of task dependencies. Those who wish for or need a more visual and guided experience using RxJS-ETL can run Kangaru-ETL to import and export files, connect to databases, write transformation scripts, and set up a queue of scheduled ETL jobs.



# Installation

**Clone** or **Download** the repo.

Run npm install to download the required libraries.

```
npm install
```

Run npm start to initiate the app.

```
npm start
```

# Usage

**Extract** 

You can choose to either **connect** to a NoSQL or SQL database or **import** a file from your local file system. 

To connect to a database, simply provide the connection URI to your source. 

To import a file, simply click the Browse button to find the source from your file system.


**Transform** 

Use the code editor in the Transform section to write your custom data transformation scripts.

**Load**

You can choose to either **connect** to a MongoDB or PostgreSQL database to load the transformed data, or you can **export** a file to your local file system. 

To connect to a database, simply provide the connection URI to your source. 

To export to your file system, simply click the Browse button to select your desired file location. Make sure to include the **file extension** (.csv, .json, or .xml) in the filename field.


# Features
Compatible with any SQL or NoSQL database with a connection string, as well as CSV, JSON, and XML flat file types.

**Add Job**

Click on the Add Job tab to create and name a new ETL task.

**Options**

If you would like to be notified when your ETL task has finished running, you can submit your email and/or phone number in the Options section.


# Built With
- **[React](https://github.com/facebook/react)** Javascript library for building responsive web apps
- **[Electron](https://github.com/electron/electron)** Create cross platfrom desktop applications using HTML and JS
- **[RxJS-ETL](https://github.com/team-velocirabbit/rx-etl)** Modular platform built with RxJS observables for creating stream-based ETL pipelines


# Issues
Please let us know about any issues you're having [here](https://github.com/team-velocirabbit/kangaru/issues).


# Authors
- Josie Glore (https://github.com/josieglore)
- Mario Granberri (https://github.com/mgranberri28)
- Timothy Kachler (https://github.com/kachler)
- Jae Lee (https://github.com/jaelee213)

# License
```
The MIT License (MIT)
Copyright © 2018 team-velocirabbit

```
