const prodPlugins = []
if (process.env.NODE_ENV === `production`) {
    prodPlugins.push(`transform-remove-console`)
}

module.exports = {
    "presets": [
        [
            "es2015",
            {
                "modules": false
            }
        ],
    ],
    "comments": false,
    "plugins": [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        ...prodPlugins

    ]
}