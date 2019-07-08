const ReactRouter = window.ReactRouterDOM;
const Router = ReactRouter.BrowserRouter;
const Route = ReactRouter.Route;
const Link = ReactRouter.Link;
const Switch = ReactRouter.Switch;
const Prompt = ReactRouter.Prompt;

class App extends React.Component {
    render () {
        return (
        <Router>
            <div>
                <Nav />
                <Switch>
                    <Route exact path="/index.html" component={Homepage} />
                    <Route path="/subscribtion" component={SubscribtionPage} />
                    <Route path="/article" component={ArticlePage} />
                </Switch>
            </div>
        </Router>
        )
    }
}