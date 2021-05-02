ssh -i ~/.ssh/Parzival cash@35.194.225.187

,
        {
            "name": "tritonNode-2",
            "script": "proxy.js",
            "args": "port=3311 mode=dev serverType=connector instanceId=connector_1 ",
            "log_date_format": "YYYY-MM-DD HH:mm Z",
            "env": {
                "NODE_ENV": "dev"
            }
        },
        {
            "name": "tritonNode-3",
            "script": "proxy.js",
            "args": "port=5566 mode=dev serverType=gameServer gameType=holdem instanceId=connector_2 ",
            "log_date_format": "YYYY-MM-DD HH:mm Z",
            "env": {
                "NODE_ENV": "dev"
            }
        },
        {
            "name": "tritonNode-4",
            "script": "proxy.js",
            "args": "port=5567 mode=dev serverType=gameServer gameType=holdem instanceId=connector_3 ",
            "log_date_format": "YYYY-MM-DD HH:mm Z",
            "env": {
                "NODE_ENV": "dev"
            }
        }