# KANGARU-ETL

Schedule and run ETL (Extract, Transform, Load) tasks.
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

**'Extract'** 
Simply provide the URLs or connection parameters to connect to your source and target databases (URLs to two test databases are provided as a demo).

Tab between **'Source'** and **'Target'** to see representations of each database's schema.

![](chrisdiff02.gif)

Select the **'DB Diff'** tab to highlight all the differences between the two schemas:

**GREEN** for additions

**RED/PURPLE** for deletions

**YELLOW** for modifications

![](chrisdiff03.gif)

Click on differences to generate the SQL scripts necessary to update your source database's schema to match that of your target's. 

# Features
Compatible with any Postgres database (hosted on ElephantSQL, AWS, etc).

Lines are drawn to depict any foreign key relationships between data.

**'Add All'** allows you to generate all SQL scripts at once.

The **Refresh** button queries your databases to update the visual representations. After making changes to your source database, for example, you can refresh to ensure that its schema is now identical to that of the target's.

# Built With
- **[React](https://github.com/facebook/react)** Javascript library for building responsive web apps
- **[Electron](https://github.com/electron/electron)** Create cross platfrom desktop applications using HTML and JS
- **[pg-promise](https://github.com/vitaly-t/pg-promise)** Library for interacting with Postgres database


# Known Issues
Not compatible with Postgres 10.2+ hosted on AWS due to known bug with accessing the information_schema tables.

# Issues
Please let us know about any issues you're having [here](https://github.com/TEAM-OSTRICH/CHRISDIFFER/issues) or visit our [website](http://www.chrisdiffer.com/) for more info.

# Future Updates
- Support for other relational databases such as MySQL
- Support for composite primary keys
- Support for default values, checks, stored procedures

# Authors
- Ge Sun (https://github.com/g-es)
- Edwin Lee Rogers (https://github.com/eleerogers)
- Kevin Mui (https://github.com/kmui18)

# License
```
The MIT License (MIT)
Copyright © 2018 TEAM-OSTRICH

```
