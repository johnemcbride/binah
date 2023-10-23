import React from "react"
import styled from 'styled-components';
import media from '../style/media';

enum COLOR {
    RED='#EB9178',
    ORANGE='#F5C487',
    YELLOW='#FFF2A8',
    BLUE='#1d70b8'
}

const MatrixContainer = styled.div`
    border: 1px solid #ccc;
    margin: 20px 0;
    ${media.mobile`
         min-width: 600px;
    `}
`;

const MatrixRow = styled.div`
    display: flex;
    flex-flow: row wrap;
`;
const MatrixCol = styled.div<{ align?: string, basis?:string, color?:string }>`
    // flex: 1;
    // flex-basis: ${({ basis }) => basis || 0};
    width: calc(90% / 8);
    width: ${({ basis }) => basis};
    text-align: ${({ align }) => align=='left' ? 'left' : 'center'};
    padding: 10px;
    border: 1px solid #ccc;
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
    width: 90%;
    height: 90%;
    border: 2px solid red;
    left: 0;
    top: 0;
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
  

const Matrix = ({vitalSigns}) => {

    const breathingRate = vitalSigns?.breathingRate?.value || null
    const heartRate = vitalSigns?.heartRate?.value || null
    const systolic = vitalSigns?.bloodPressure?.value?.systolic || null

    const score = calculateNewsScore(breathingRate,null,null,null,systolic,heartRate)
    const finalScore = score.respirationRateScore + score.spo2Scale1Score + score.spo2Scale2Score + score.airOxygenScore + score.systolicBPScore + score.pulseScore

    const hRMP = getHeartRateMatrixPoint(heartRate)
    const bRMP = getBreathRateMatrixPoint(breathingRate)
    const bpMP = getBloodPressureMatrixPoint(systolic)

    return (
        <>
        <MatrixContainer>
            <MatrixRow>
                <MatrixCol align="left" basis='21%' color={COLOR.BLUE}> <Span> Physiological parameter </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 3 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 2 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 1 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> Score <br/>0 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 1 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 2 </Span></MatrixCol>
                <MatrixCol  color={COLOR.BLUE}> <Span> 3 </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Respiration rate <br/> (per minute) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {bRMP===-3 && <Overlay />} <Span> {'≤'}8 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{bRMP===-1 && <Overlay />} <Span> 9-11 </Span></MatrixCol>
                <MatrixCol>{bRMP===0 && <Overlay />} <Span> 12-20 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{bRMP===2 && <Overlay />} <Span> 21-24 </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}>{bRMP===3 && <Overlay />} <Span> &ge;25 </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> SpO<sub>2</sub>Scale 1 (%) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> &le;91 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> 92-93 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> 94-95 </Span></MatrixCol>
                <MatrixCol> <Span> &ge;96 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> {' '} </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> SpO<sub>2</sub>Scale 2 (%) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> &le;83 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> 84-85 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> 86-87 </Span></MatrixCol>
                <MatrixCol> <Span> 88-92<br/>&ge;93 on air </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> 93-94 on<br/>oxygen </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> 95-96 on<br/>oxygen </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> &ge;97 on<br/>oxygen </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Air or oxygen? </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> oxygen </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol> <Span> Air  </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '}</Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> {' '} </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Systolic blood pressure (mmHg) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {bpMP===-3 && <Overlay />}<Span> &le;90 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{bpMP===-2 && <Overlay />} <Span> 91-100 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{bpMP===-1 && <Overlay />} <Span> 101-110 </Span></MatrixCol>
                <MatrixCol>{bpMP===0 && <Overlay />} <Span> 111-219 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}><Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {bpMP===3 && <Overlay />}<Span> &ge;220 </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Pulse (per minute) </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> {hRMP===-3 && <Overlay />} <Span> &le;40 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{hRMP===-1 && <Overlay />} <Span> 41-50 </Span></MatrixCol>
                <MatrixCol>{hRMP===0 && <Overlay />} <Span> 51-90 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}>{hRMP===1 && <Overlay />} <Span> 91-110 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}>{hRMP===2 && <Overlay />} <Span> 111-130 </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}>{hRMP===3 && <Overlay />} <Span> &ge;131 </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Consciousness </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol> <Span> Alert </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> {' '}</Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> CVPU </Span></MatrixCol>
            </MatrixRow>
            <MatrixRow>
                <MatrixCol align="left" basis='21%'  color={COLOR.BLUE}> <Span> Temperature {'('}&deg;{'C}'} </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> &le;35.0 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> {' '} </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> 35.1-36.0 </Span></MatrixCol>
                <MatrixCol> <Span> 36.1-38.0 </Span></MatrixCol>
                <MatrixCol color={COLOR.YELLOW}> <Span> 38.1-39.0 </Span></MatrixCol>
                <MatrixCol color={COLOR.ORANGE}> <Span> &ge;39.1 </Span></MatrixCol>
                <MatrixCol color={COLOR.RED}> <Span> {' '} </Span></MatrixCol>
            </MatrixRow>
        </MatrixContainer>
        <FinalScore>Your overall NEWS2 score is {finalScore}</FinalScore>
        </>
    )
}

export default Matrix