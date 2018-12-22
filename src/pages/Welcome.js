import React from 'react';
// import ReactDOM   from'react-dom'
import ReactMarkdown from 'react-markdown/with-html';
import * as showdown from 'showdown';
import   showdownHighlight from "showdown-highlight"
const converter = new showdown.Converter({
  extensions: [showdownHighlight]
});

// .Converter();


import axios from 'axios';
const input = '# This is a header\n\nAnd this is a paragraph';
//https://raw.githubusercontent.com/rexxars/react-markdown/master/README.md
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
      // converter = new showdown.Converter(),
      // text      = '# hello, markdown!',
      // html      = converter.makeHtml(text);
        this.setState({ md: converter.makeHtml(data.data) });

      })
      .catch(function(err) {
        console.log('ERR');
        console.log(err);
      });
  }
  render() {
    return (
      <p>
        想要添加更多页面？请参考 
        {/* <ReactMarkdown source={this.state.md}  escapeHtml={false} /> */}
        {/* {this.state.md} */}
        <div dangerouslySetInnerHTML={{ __html: this.state.md }} />
        <a href="https://umijs.org/guide/block.html" target="_blank" rel="noopener noreferrer">
          umi 区块
        </a>
        。
      </p>
    );
  }
}
