import { Component } from 'react'

import AceEditor from 'react-ace'
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/snippets/python";
import { Button, Dropdown, Grid, Icon, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'


const languageOptions = [
  { key: 'Python', text: 'Python 3', value: 'python' },
  { key: 'Java', text: 'Java', value: 'java' },
]

class Room extends Component {

  constructor(props) {
    super(props)
    this.state = {
      language: 'python',
      code: 'print("hello world! python")',
      output: '',
    }
  }

  onCodeChange = code => {
    this.setState({ code })
  }

  onLanguageChange(e, data) {
    this.setState({ language: data.value })
  }

  // Evaluate code from backend
  onRunButtonClick () {
    const {language, code} = this.state
    axios.post('/api/v0', {language, code})
         .then(res => {
           console.log('got message from api server', res.data)
           this.setState({output: res.data.run.output})
          })
         .catch(err => console.error('api call error', err))
  }

  render() {
    const { code, language, output } = this.state
    return (
      <Grid centered columns={1}>
        <Grid.Row>

          <Grid.Column>
            <Dropdown
              button
              floating
              labeled
              options={languageOptions}
              defaultValue={languageOptions[0].value}
              onChange={this.onLanguageChange.bind(this)}
            />
            <Segment>
              <AceEditor
                width={'100%'}
                mode={language}
                value={code}
                theme="github"
                onChange={this.onCodeChange.bind(this)}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Button animated onClick={this.onRunButtonClick.bind(this)}>
              <Button.Content hidden>RUN</Button.Content>
              <Button.Content visible>
                <Icon name='play'></Icon>
              </Button.Content>
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Message>
              <Message.Header>Output:</Message.Header>
              <pre>{output}</pre>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  }
}

export default Room