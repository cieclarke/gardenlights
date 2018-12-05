# Light Symphony Custom Webpage Project

## Installation & Setup

```$> git clone https://github.com/cieclarke/gardenlights.git```

```$> npm install```

add options file ```options.json```

```
{
    "port":3000,
    "lsdevice": {
        "server": "192.0.0.1",
        "port": 10001
    },
    "deploy": {
        "html_file_name": "index.htm",
        "html_build_folder": "website/"
    },
    "zones" : [
        {
            "id" : 0,
            "name" : "all",
            "display" : "All Lights"
        }.....
    ]
        
    
}
```

```lsdevice.server``` is the ip address of the light symphony remote. Further references for programming the remote are [here](https://lightsymphony.com/images/datasheets/Interfacing.pdf).

```$> gulp run```

## Notes

The webpage is built as a standalone application. It does not need the internet to work. The references to css and javascript libraries have been imported in to the web page instead of using the CDNs. More cumbersome, yes, but it means it will function as normal if the internet connaction is not working (it is an intranet application). The external css and javascript libraries used here are for my benefit. I wanted to use Bootstrap with Sass and Gulp tasks to get an overview on how they are utilised.

## Conclusions

### Bootstrap
A very easy to use CSS library but only if you have a decent basic understanding of CSS. For displaying documents and information it is proably not needed but for basic web applications it can enhance a user experience. You just have to go with their look and feel untill you start overring some Sass variables. For this webapge however it is too much, probably half the html and a few lines of css would have sufficed in this case and acheived the same look and functionality.

### Gulp

A great tool for aggregating and automating tasks. I used it for testing, building and deploying which was done in one task that aggregated many.

### In page javascript

[I didn't use jQuery](http://vanilla-js.com/)
