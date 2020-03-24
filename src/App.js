import React from 'react';
import { xsltProcess, xmlParse } from 'xslt-processor';
import 'bootstrap/dist/css/bootstrap.min.css';

// xmlString: string of xml file contents
// xsltString: string of xslt file contents

class App extends React.Component {

  constructor(props) {
    super(props);
    this.doXSLT = this.doXSLT.bind(this);
  }

  doXSLT() {
    const xmlString = `
      <grupos>
          <grupo id="1">
              <alumno>
                  <nombre>Juan</nombre>
                  <apellido>Hidalgo</apellido>
              </alumno>
              <alumno>
                  <nombre>Ana</nombre>
                  <apellido>Chen</apellido>
              </alumno>
              <alumno>
                  <nombre>Diego</nombre>
                  <apellido>Silgueiro</apellido>
              </alumno>
          </grupo>
          <grupo id="2">
              <alumno>
                  <nombre>Esmir</nombre>
                  <apellido>Acosta</apellido>
              </alumno>
              <alumno>
                  <nombre>Jesus</nombre>
                  <apellido>Carrasco</apellido>
              </alumno>
          </grupo>
          <grupo id="3">
              <alumno>
                  <nombre>Juana</nombre>
                  <apellido>Valdes</apellido>
              </alumno>
              <alumno>
                  <nombre>Regina</nombre>
                  <apellido>Do Santos</apellido>
              </alumno>
              <repetidores>
                  <alumno>
                      <nombre>Eva</nombre>
                      <apellido>Morales</apellido>
                  </alumno>
              </repetidores>
          </grupo>
      </grupos>
      `;

    const xsltString = `
      <xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
          <xsl:output method="xml"/>

          <xsl:template match="/">
              
            <div class="container">
              <table class="table">
                  <thead>
                      <tr>
                          <th>Grupo</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                      </tr>
                  </thead>
                  <tbody>
                      <xsl:for-each select="/grupos/grupo/alumno" >
                          <tr>
                              <td>
                                  <xsl:value-of select="../@id"/>
                              </td>
                              <td>
                                  <xsl:value-of select="nombre"/>
                              </td>
                              <td>
                                  <xsl:value-of select="apellido"/>
                              </td>
                          </tr>
                      </xsl:for-each>
                  </tbody>
              </table>
            </div>          
          
          </xsl:template>

      </xsl:stylesheet>
      `;

    const outXmlString = xsltProcess(
      xmlParse(xmlString),
      xmlParse(xsltString)
    );

    return (
      <div className="container" dangerouslySetInnerHTML={{ __html: outXmlString }}></div>
    );
  }

  render() {
    return (
      <>
      { this.doXSLT() } 
      </>
    );
  }
}

export default App;
