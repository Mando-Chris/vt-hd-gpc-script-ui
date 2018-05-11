import React, { Component } from 'react';
import { Button, Grid, Header, List, Segment, Dropdown } from 'semantic-ui-react'

import { CustomMessage, Navbar } from 'components'
import 'styling/semantic.less'
import RadioGroup from './RadioGroup'

import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:8000');
function subscribeToUpdates(cb) {
  socket.on('update', update => cb(update));
}


const leftItems = [
  {
    as: 'a',
    content: 'My Name',
    href: 'https://react.semantic-ui.com/',
    icon: 'user',
    key: 'docs',
    target: '_blank'
  },
]
const rightItems = [
  {
    as: 'a',
    content: '867-5309',
    href: 'https://github.com/Semantic-Org/Semantic-UI-React',
    icon: 'call square',
    key: 'github',
    target: '_blank'
  },
  {
    as: 'a',
    content: 'Middle Earth',
    icon: 'marker',
    href: 'https://stackoverflow.com/questions/tagged/semantic-ui-react?sort=votes',
    key: 'so',
    target: '_blank',
  }
]

const tutorTypes = [
  { key: 1, text: 'In-Person', value: 'In-Person' },
  { key: 2, text: 'Will Consider Online', value: 'Will Consider Online' },
  { key: 3, text: 'Online', value: 'Online' },
]

const tutorRates = [
  { key: 1, text: 'Academic 6+', value: 'Academic 6+' },
  { key: 2, text: 'Academic K–5', value: 'Academic K–5' },
  { key: 3, text: 'K–12 Test Prep', value: 'K–12 Test Prep' },
  { key: 4, text: 'Graduate Test Prep', value: 'Graduate Test Prep' },
  { key: 5, text: 'Academic 6+ (Online Only)', value: 'Academic 6+ (Online Only)' },
  { key: 6, text: 'Academic K-5 (Online Only)', value: 'Academic K-5 (Online Only)' },
  { key: 7, text: 'K–12 Test Prep (Online Only)', value: 'K–12 Test Prep (Online Only)' },
  { key: 8, text: 'Graduate Test Prep (Online Only)', value: 'Graduate Test Prep (Online Only)' },
]

class App extends Component{
    constructor (props) {
        super(props)
        this.state = {
            notes: [{name:"colleen",content:"this is a note",timestamp:"12:34:%45"},{name:"oliver",content:"second note",timestamp:"12:34:%45"}],
            hours_recommended: 8,
            lead_pitched_y_n: false,
            start_date: '2018-10-12',
            tutor_type: 'Online',
            tutor_rate: 'Graduate Test Prep (Online Only)'
        };
    }
    componentDidMount() {   
      subscribeToUpdates((update) => {
        if(update.call_notes){
          let newNotes = this.state.notes.slice();
          newNotes.push({
            name:'Laura Torp',
            content: update.call_notes,
            timestamp: new Date()
          }
          );
          update.notes = newNotes;
        }
        this.setState(update);
 
        console.log('update', update);
      });
    }

    render() {
        return(
            <Navbar leftItems={leftItems} rightItems={rightItems}>
                <Segment>
                    <div id="row">
                    <Grid>
                    <Grid.Column computer={4}>
                    <Header>Was Pitched</Header>
                    <input id="pitched" type="text" value={this.state.lead_pitched_y_n} readonly/>
                    
                    </Grid.Column>
                    <Grid.Column computer={4}>
                    <Header>Tutor Type</Header>
                    
                    <Dropdown id="tutor_type"
                        selection options={tutorTypes}
                        defaultValue={this.state.tutor_type}/>
                    
                    <Header>Test Date</Header>
                    <div class="ui input left icon">
                        <i class="calendar icon"></i>
                        <input id="datePicker" type="text" value={this.state.start_date} readonly/>
                    </div>
                    
                    </Grid.Column>
                    <Grid.Column computer={8}>
                    <Header>Tutor Rate</Header>
                    <Dropdown id="tutor_rate" 
                        selection options={tutorRates}
                        defaultValue={this.state.tutor_rate}/>
                    <Header> Hours </Header>
                    <input id="hours" type="text" value={this.state.hours_recommended} readonly/>
                    </Grid.Column>
                    </Grid>
                    </div>
                    
                    <Header>Notes</Header>
                    <List>
                               {this.state.notes.map(note =>
                                <List.Item>
                                <Grid>
                                    <Grid.Column computer={3}>
                                  <font size='2'> <b> {note.name} </b> </font>
                                  <br></br>
                                  <font size='1'> {note.timestamp}</font>
                                   </Grid.Column>
                                   <Grid.Column computer={13} >
                                   <font size="4">{note.content}</font>
                                </Grid.Column>
                                  
                                  </Grid>
                                  <hr></hr>
                                </List.Item>
                               )}
                    </List>
    
                </Segment>
            </Navbar>
        );
    }
/*const App = () => (
  <Navbar leftItems={leftItems} rightItems={rightItems}>
    <Segment>
      <Header as='h1'>Your example App</Header>

      <Grid>
        <Grid.Column computer={6} mobile={16}>
          <p>Welcome to your Semantic UI React App! It is awesome <span aria-label='emoji' role='img'>😉</span></p>

          <p>
            This boilerplate is designed to show theming features of SUI with modern environment. It based on the
            awesome{' '}
            <a href='https://github.com/facebookincubator/create-react-app' rel='noopener noreferrer' target='_blank'>
              Create React App package
            </a>
            {' '}with some additions.
          </p>

          <Header as='h4'>React Hot Loader</Header>
          <p>
            <a href='https://github.com/gaearon/react-hot-loader' rel='noopener noreferrer' target='_blank'>
              React Hot Loader
            </a>
            {' '}become stable and we can use safely, it improves your delevopment speed cardinally.
          </p>

          <Header as='h4'>LESS loader</Header>
          <p>
            Semantic UI is powered by LESS, so we need it to enable its powerful theming. We also
            enabled {' '}
            <a href='https://github.com/css-modules/css-modules' rel='noopener noreferrer' target='_blank'>
              CSS modules
            </a>
            {' '}for your components.
          </p>

          <Header as='h4'>Bundle analyzer and direct imports</Header>
          <p>
            Semantic UI React is very powerful, but in most cases you do not need all its modules. In fact, unused
            modules should be removed by{' '}
            <a href='https://webpack.js.org/guides/tree-shaking/' rel='noopener noreferrer' target='_blank'>
              Tree Shaking
            </a>
            , but current situation does not allow to rely on it. Our users use direct import of SUIR components,
            but we do not recommend to use this approach because paths to modules can be changed. We added{' '}
            <a
              href='https://www.npmjs.com/package/babel-plugin-direct-import'
              rel='noopener noreferrer'
              target='_blank'
            >
              direct-import
            </a>
            {' '}plugin that automatically transform your import to direct.
          </p>
          <p>We also added bundle analyzer, so you can always review the size of your bundles.</p>
        </Grid.Column>
        <Grid.Column computer={10} mobile={16}>
          <Header as='h3'>Themed <code>Button</code></Header>
          <p>
            Semantic UI React does not have own theming and fully relies on CSS part of Semantic UI. It is normal,
            Semantic UI theming is very powerful, it allows you fully modify the look of your app using theming
            variables.
          </p>
          <p>
            We changed the <code>primary</code> color of <code>Button</code> component, it is really easy
            <span aria-label='emoji' role='img'>😁</span> Take a look to{' '}
            <code>/src/styling/theme/elements/button.variables</code>. By the way, the <code>theme</code> directory
            structure fully matches the component structure of Semantic UI React.
          </p>
          <Button primary>Primary Button</Button>
          <Button href='https://semantic-ui.com/usage/theming.html' rel='noopener noreferrer' target='_blank'>
            Learn more
          </Button>

          <Header as='h3'>Custom themed component</Header>
          <p>
            In the real world you will always need custom components, and you will want to get them themed like your
            app. An example is below:
          </p>

          <CustomMessage>Hey, it is a custom message</CustomMessage>

          <p>
            Take a look <code>/src/components/CustomMessage</code> directory. The are some important things:
          </p>
          <List bulleted>
            <List.Item>
              we premade <code>heading.less</code> for you, when you will include it in your LESS file you will able
              to use your existing SUI variables!
            </List.Item>
            <List.Item>
              we enabled{' '}
              <a href='https://github.com/css-modules/css-modules' rel='noopener noreferrer' target='_blank'>
                CSS modules
              </a>
              {' '}for your components, it means that you will need to use <code>:global</code> when your style will
              match SUI parts
            </List.Item>
          </List>

          <Header as='h3'>P.S.</Header>
          <p>This page is fully responsive <span aria-label='emoji' role='img'>😁</span></p>
        </Grid.Column>
      </Grid>
    </Segment>
  </Navbar>
)*/
}   
export default App
    