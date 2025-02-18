import React from "react"
import styled from 'styled-components';
import media from '../style/media';
import { Button, Container, Hero, Header, Row, Col, Card } from 'nhsuk-react-components';

import { useNavigate } from "react-router-dom";
enum COLOR {
    RED='#EB9178',
    ORANGE='#F5C487',
    YELLOW='#FFF2A8',
    BLUE='#1d70b8'
}

const MatrixContainer = styled.div`
    border: 1px solid #ccc;
    margin: 20px 0;
    font-size: 12px;
    ${media.mobile`
         min-width: 600px;
         font-size: 16px;
    `}
`;

const MatrixRow = styled.div`
    display: flex;
    flex-flow: row wrap;
`;
const MatrixCol = styled.div<{ align?: string, basis?:string, color?:string, border?:string }>`
    // flex: 1;
    // flex-basis: ${({ basis }) => basis || 0};
    width: calc(90% / 8);
    width: ${({ basis }) => basis};
    text-align: ${({ align }) => align=='left' ? 'left' : 'center'};
    padding: 10px;
    border: 1px solid #ccc;
    border: ${({ border }) => border};
    background-color: ${({ color }) => color || 'white'};
    color: ${({ color }) => color === COLOR.BLUE ? 'white' : 'black'};
    position: relative;

`;


const Span = styled.span`
   
`;
const Overlay = styled.span`
    position: absolute;
    content: ' ';
    display: block;
    border: 2px solid red;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
`;
const FinalScore = styled.p`
    margin: 10px 0;
    border: 1px solid lightgrey;
    padding: 8px;
    border-radius: 4px;
    background: white;
`;

enum OxygenType {
    AIR = 0,
    OXYGEN = 2,
  }

const calculateNewsScore = (
    RESPIRATION_RATE,
    SPO2_SCALE1,
    SPO2_SCALE2,
    AIR_OXYGEN,
    SYSTOLIC_BP,
    PULSE
  ) => {
    const respirationRateScore = RESPIRATION_RATE
      ? (() => {
          if (RESPIRATION_RATE <= 8) return 3;
          if (RESPIRATION_RATE >= 9 && RESPIRATION_RATE <= 11) return 1;
          if (RESPIRATION_RATE >= 12 && RESPIRATION_RATE <= 20) return 0;
          if (RESPIRATION_RATE >= 21 && RESPIRATION_RATE <= 24) return 2;
          return 3;
        })()
      : 0;
  
    const spo2Scale1Score = SPO2_SCALE1
      ? (() => {
          if (SPO2_SCALE1 <= 91) return 3;
          if (SPO2_SCALE1 >= 92 && SPO2_SCALE1 <= 93) return 2;
          if (SPO2_SCALE1 >= 94 && SPO2_SCALE1 <= 95) return 1;
          return 0;
        })()
      : 0;
  
    const spo2Scale2Score = SPO2_SCALE2
      ? (() => {
          if (SPO2_SCALE2 <= 83) return 3;
          if (SPO2_SCALE2 >= 84 && SPO2_SCALE2 <= 85) return 2;
          if (SPO2_SCALE2 >= 86 && SPO2_SCALE2 <= 87) return 1;
          if (SPO2_SCALE2 >= 88 && SPO2_SCALE2 <= 92) return 0;
          if (SPO2_SCALE2 >= 93 && SPO2_SCALE2 <= 94) return 1;
          if (SPO2_SCALE2 >= 95 && SPO2_SCALE2 <= 96) return 2;
          return 3;
        })()
      : 0;
  
    const airOxygenScore = AIR_OXYGEN ? (AIR_OXYGEN === OxygenType.OXYGEN ? 2 : 0) : 0;
  
    const systolicBPScore = SYSTOLIC_BP
      ? (() => {
          if (SYSTOLIC_BP <= 90) return 3;
          if (SYSTOLIC_BP >= 91 && SYSTOLIC_BP <= 100) return 2;
          if (SYSTOLIC_BP >= 101 && SYSTOLIC_BP <= 110) return 1;
          if (SYSTOLIC_BP >= 111 && SYSTOLIC_BP <= 219) return 0;
          return 3;
        })()
      : 0;
  
    const pulseScore = PULSE
      ? (() => {
          if (PULSE <= 40) return 3;
          if (PULSE >= 41 && PULSE <= 50) return 1;
          if (PULSE >= 51 && PULSE <= 90) return 0;
          if (PULSE >= 91 && PULSE <= 110) return 1;
          if (PULSE >= 111 && PULSE <= 130) return 2;
          return 3;
        })()
      : 0;
  
    return (
      {
        respirationRateScore,
        spo2Scale1Score,
        spo2Scale2Score,
        airOxygenScore,
        systolicBPScore,
        pulseScore
    }
    );
  }

  const getBreathRateMatrixPoint = (RESPIRATION_RATE) => {
    if (!RESPIRATION_RATE) return null;
    if (RESPIRATION_RATE <= 8) return -3;
    if (RESPIRATION_RATE >= 9 && RESPIRATION_RATE <= 11) return -1;
    if (RESPIRATION_RATE >= 12 && RESPIRATION_RATE <= 20) return 0;
    if (RESPIRATION_RATE >= 21 && RESPIRATION_RATE <= 24) return 2;
    return 3;
  }

  const getHemoglobinMatrixPoint = (HEMOGLOBIN) => {  
  if (!HEMOGLOBIN) return null;
  if(HEMOGLOBIN <= 5.7) return 0;
  if(HEMOGLOBIN >= 5.8 && HEMOGLOBIN <= 6.1) return 1;
  if(HEMOGLOBIN >= 6.2 && HEMOGLOBIN <= 6.4) return 2;
  if(HEMOGLOBIN > 6.5 ) return 3;
  }


  const getHeartRateMatrixPoint = (PULSE) => {
    if (!PULSE) return null;
    if (PULSE <= 40) return -3;
    if (PULSE >= 41 && PULSE <= 50) return -1;
    if (PULSE >= 51 && PULSE <= 90) return 0;
    if (PULSE >= 91 && PULSE <= 110) return 1;
    if (PULSE >= 111 && PULSE <= 130) return 2;
    return 3;
  }

  const getBloodPressureMatrixPoint = (SYSTOLIC_BP) => {
    if (!SYSTOLIC_BP) return null;
    if (SYSTOLIC_BP <= 90) return -3;
    if (SYSTOLIC_BP >= 91 && SYSTOLIC_BP <= 100) return -2;
    if (SYSTOLIC_BP >= 101 && SYSTOLIC_BP <= 110) return -1;
    if (SYSTOLIC_BP >= 111 && SYSTOLIC_BP <= 219) return 0;
    return 3;
  }
  

const MatrixPage = ({vitalSigns}) => {

    console.log('vitalSigns', vitalSigns)
    const navigate = useNavigate()

    const breathingRate = vitalSigns?.breathingRate?.value || null
    const heartRate = vitalSigns?.heartRate?.value || null
    const systolic = vitalSigns?.bloodPressure?.value?.systolic || null

    const score = calculateNewsScore(breathingRate,null,null,null,systolic,heartRate)
    const finalScore = score.respirationRateScore + score.spo2Scale1Score + score.spo2Scale2Score + score.airOxygenScore + score.systolicBPScore + score.pulseScore

    const hRMP = getHeartRateMatrixPoint(heartRate)
    const bRMP = getBreathRateMatrixPoint(breathingRate)
    const bpMP = getBloodPressureMatrixPoint(systolic)
    const hMP = getHemoglobinMatrixPoint(vitalSigns?.hemoglobinA1c?.value)

    return (
        <>

          <Header>
            <Header.Container>
              <Header.Logo href="/" />
              
            </Header.Container>
         
          </Header>

             <Container>
            <Row>
              <Col width="full">
              <Card>
                <Card.Content>
                    <Card.Heading>View Your Results</Card.Heading>
                    <Card.Description>Depending on the quality of your camera this app should have picked up your breathing rate, pulse, blood pressure and even blood sugar (Heomoglobin A1C). 
                      
                      The chart below shows where your reading fell within normal ranges.  </Card.Description>
                  </Card.Content>
                </Card>
          
          
              </Col>
          
           
            </Row>
            <Row>
              <Col width="full">
            
        <MatrixContainer>
        <MatrixRow>
                <MatrixCol border="none" align="left" basis='21%' color={COLOR.BLUE}> <Span>  </Span></MatrixCol>
                <MatrixCol  border="none" color={COLOR.BLUE}> <Span>  </Span></MatrixCol>
                <MatrixCol   border="none" color={COLOR.BLUE}> <Span> </Span></MatrixCol>
                <MatrixCol  border="none" color={COLOR.BLUE}> <Span> </Span></MatrixCol>
                <MatrixCol  border="none" color={COLOR.BLUE}> <Span> Score </Span></MatrixCol>
                <MatrixCol  border="none" color={COLOR.BLUE}> <Span> </Span></MatrixCol>
                <MatrixCol  border="none"  color={COLOR.BLUE}> <Span> </Span></MatrixCol>
                <MatrixCol  border="none" color={COLOR.BLUE}> <Span>  </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%' color={COLOR.BLUE}> <Span> Physiological parameter </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 3 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 2 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 1 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 0 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 1 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 2 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 3 </Span></MatrixCol>
            </MatrixRow>

            {bRMP != null?
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Respiration rate <br/> (per minute) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {bRMP===-3 && <Overlay />} <Span> &le;8 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{bRMP===-1 && <Overlay />} <Span> 9-11 </Span></MatrixCol>
                <MatrixCol>{bRMP===0 && <Overlay />} <Span> 12-20 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{bRMP===2 && <Overlay />} <Span> 21-24 </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}>{bRMP===3 && <Overlay />} <Span> &ge;25 </Span></MatrixCol>
            </MatrixRow>: null}
         
            {bpMP != null?
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Systolic blood pressure (mmHg) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {bpMP===-3 && <Overlay />}<Span> &le;90 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{bpMP===-2 && <Overlay />} <Span> 91-100 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{bpMP===-1 && <Overlay />} <Span> 101-110 </Span></MatrixCol>
                <MatrixCol>{bpMP===0 && <Overlay />} <Span> 111-219 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}><Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {bpMP===3 && <Overlay />}<Span> &ge;220 </Span></MatrixCol>
            </MatrixRow> :null}

            {hRMP != null?
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Pulse (per minute) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {hRMP===-3 && <Overlay />} <Span> &le;40 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{hRMP===-1 && <Overlay />} <Span> 41-50 </Span></MatrixCol>
                <MatrixCol>{hRMP===0 && <Overlay />} <Span> 51-90 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{hRMP===1 && <Overlay />} <Span> 91-110 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{hRMP===2 && <Overlay />} <Span> 111-130 </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}>{hRMP===3 && <Overlay />} <Span> &ge;131 </Span></MatrixCol>
            </MatrixRow>:null}
          {hMP != null?
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Hemoglobin A1C </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {hMP===-3 && <Overlay />} <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{hMP===-1 && <Overlay />} <Span> {' '} </Span></MatrixCol>
                <MatrixCol>{hMP===0 && <Overlay />} <Span> &le;5.7 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{hMP===1 && <Overlay />} <Span> 5.8-6.1 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{hMP===2 && <Overlay />} <Span> 6.2-6.4 </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}>{hMP===3 && <Overlay />} <Span>6.4+ </Span></MatrixCol>
            </MatrixRow>: null}
       
       
        </MatrixContainer>
              </Col>
            </Row>

            <Row>
              <Col width="full">
              <Card>
                <Card.Content>
                    <Card.Heading>What do you think?</Card.Heading>
                    <Card.Description>Can you think of how this could help with public health?  </Card.Description>
                  </Card.Content>
                </Card>
          
          
              </Col>
          
           
            </Row>
          </Container>

       
        </>
    )
}

export default MatrixPage