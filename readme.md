# Light Symphony Custom Webpage Project

## Installation & Setup

```$> git clone https://github.com/cieclarke/gardenlights.git```

```$> npm install```

add options file ```options.json```

```
{
    "port":3000,
        "lsdevices": [{
            "server": "192.0.0.1",
            "port": 10001
        }...
    ],
    "zones" : [
        {
            "id" : 0,
            "name" : "all",
            "display" : "All Lights"
        }...
    ]
}
```

```lsdevice.server``` is the ip address of the light symphony remote. Further references for programming the remote are [here](https://lightsymphony.com/images/datasheets/Interfacing.pdf).

```$> gulp run```

## Notes

The webpage is built as a standalone application. It does not need the internet to work.

## Conclusions

### Gulp

A great tool for aggregating and automating tasks. I used it for testing, building and deploying which was done in one task that aggregated many.

### In page javascript ;)

[I didn't use a library](http://vanilla-js.com/)
