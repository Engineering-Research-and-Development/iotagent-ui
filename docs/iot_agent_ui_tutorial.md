[![FIWARE Banner](https://fiware.github.io/tutorials.IoT-over-MQTT/img/fiware.png)](https://www.fiware.org/developers)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

# IoT Agent UI Tutorial

This is a step-by-step tutorial that will introduce in detail how to install and run IoT Agent UI to monitor and controll all the FIWARE-enabled IoT Agents installed in your plant/testbed.


## Step-by-step Tutorial

In this paragraph we are going to describe how to quickly deploy a working testbed consisting of all the actors: Car,
Agent, Orion Context Broker and the two MongoDB instances.

#### Requirements

-   Docker (Version 19.03.1+)
-   Docker-compose (Version 1.24.1+)

Install docker and docker-compose by following the instructions available on the official web site:

-   Docker: [here](https://docs.docker.com/install/linux/docker-ce/ubuntu/)
-   Docker-Compose: [here](https://docs.docker.com/compose/install/)

Once docker has been correctly installed you can continue with the other steps

#### Step 1 - Clone the IoT Agent UI Repository

Open a terminal and move into a folder in which to create the new folder containing the IotAgent testbed

Then run:

```bash
git clone "https://github.com/Engineering-Research-and-Development/iotagent-ui"
```

#### Step 2 - Run the testbed

To launch the whole testbed:

```bash
cd iotagent-ui/docker
docker-compose up -d
```

After that you can run:

```bash
docker ps
```

to check if all the required components are running

Running the docker environment (using configuration files as is) creates the following situation:
![Docker Containers Schema](./images/OPC%20UA%20Agent%20tutorial%20Containers.png)
