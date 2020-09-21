import React, { useState, useEffect } from 'react';
import Editor from "./Editor"
import useLocalStorage from "../hooks/useLocalStorage"
import "bootstrap/dist/css/bootstrap.min.css";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";

function App() {

const [html, setHtml] = useLocalStorage('html', '')
const [css, setCss] = useLocalStorage('css', '')
const [js, setJs] = useLocalStorage('js', '')
const [srcDoc, setSrcDoc] = useState('')

useEffect(() =>{
  const timeout= setTimeout(()=>{
     setSrcDoc(`
     <html>
       <body>${html}</body>
       <style>${css}</style>
       <script>${js}</script>
     </html>
   `)
  },400)
  return()=> clearTimeout(timeout)
},[html, css, js])



  return (
      <div classname="pane">
          <Row>
            <Col md={6} sm={12}>
              <Editor 
                  language="xml"
                  displayName="HTML"
                  value={html}
                  onChange={setHtml}
              />
              <Editor
                  language="css"
                  displayName="CSS"
                  value={css}
                  onChange={setCss}
                />
              <Editor
                  language="javascript"
                  displayName="JS"
                  value={js}
                  onChange={setJs}
              />
           </Col>
           <Col md={6} sm={12}>
                <div className="pane-title"> Rendering Area</div>
                  <iframe 
                      srcDoc={srcDoc}
                      title="output"
                      sandbox="allow-scripts"
                      frameBorder="0"
                      width="100%"
                      height="100%"
                  />
          </Col>
        </Row>
    </div>
  );
}

export default App;
