'use strict';
const NewComponent = (Component) => 
  class extends React.Component {
    render () {
    const {views} = this.props;
    if (views < 100) {
      return (
      <New>
        <Component {...this.props} />
      </New>
      )
    } else if (views > 1000) {
      return (
      <Popular>
        <Component {...this.props} />
      </Popular>
      )
    } else
      return <Component {...this.props} />
    }
  }

const ArticleComponent = NewComponent(Article);
const VideoComponent = NewComponent(Video);

const List = props => {
    return props.list.map(item => {
        switch (item.type) {
            case 'video':
                return (
                    <VideoComponent {...item} />
                );

            case 'article':
                return (
                    <ArticleComponent {...item} />
                );
        }
    });
};