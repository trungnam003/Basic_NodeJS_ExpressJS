import routerSite from "./site.js"
function route(app){
    app.use("/", routerSite)
}

export default route
