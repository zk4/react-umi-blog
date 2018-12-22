import React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import axios from 'axios';
import * as showdown from 'showdown';
import   showdownHighlight from "showdown-highlight"

const converter = new showdown.Converter({
  extensions: [showdownHighlight]
});

export default class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      md: '',
    };
  }
  componentWillMount() {
    axios
    .get('https://raw.githubusercontent.com/rexxars/react-markdown/master/README.md')
    .then(data => {
        this.setState({ md: converter.makeHtml(data.data) });

      })
      .catch(function(err) {
        console.log('ERR');
        console.log(err);
      });
  }
  render() {
    return (
      <div>
        {/* <ReactMarkdown source={this.state.md}  escapeHtml={false} /> */}
        <div dangerouslySetInnerHTML={{ __html: this.state.md }} />
        <a href="https://umijs.org/guide/block.html" target="_blank" rel="noopener noreferrer">
          umi 区块
        </a>
        。
      </div>
    );
  }
}
