import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";
import update from "immutability-helper";

function Consent() {
  const [boxesChecked, setBoxesChecked] = useState([false, false]);
  const [showFormHelper, setShowFormHelper] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setShowFormHelper(true);
  };

  return (
    <div className={"m-3"}>
      <div className="row" id="firstItem">
        <div className="col">
          <p className={"d-flex justify-content-end"}>
            <img src="/hu-berlin-logo.png" alt="Logo" width="30%" />
          </p>
        </div>
      </div>
      <div className="pageBreak">
        <h1>Informed Consent of Participation</h1>
        <p>
          You are invited to participate in the user study{" "}
          <b>
            Predicting Mental Workload During Smartphone Use Using Touch Typing
            Dynamics
          </b>
          . The research is supervised by Prof. Dr. Thomas Kosch. Please note:
        </p>
        <ul>
          <li>
            Your participation is entirely voluntary and can be withdrawn at any
            time
          </li>
          <li>The user study will last approximately 20 minutes</li>
          <li>We will record personal demographics (age, gender, etc.)</li>
          <li>
            We will record smartphone sensor data and data from your textual
            inputs
          </li>
          <li>
            All records and data will be subject to standard data use policies
          </li>
          <li>All records and subject-related data will be anonymized</li>
          <li>Repeated participation in the study is not permitted</li>
        </ul>
        <p>
          The alternative to participation in this study is to choose not to
          participate. If you have any questions or complaints about the whole
          informed consent process of this research study or your rights as a
          human research subject, please contact Prof. Dr. Thomas Kosch (E-Mail:
          thomas.kosch@hu-berlin.de). You should carefully read the information
          below. Please take the time you need to read the consent form.
        </p>
      </div>
      <div className="pageBreak">
        <h3>1. Purpose and Goal of this Research</h3>
        <p>
          The purpose of this research is to study touch typing dynamics with
          varying cognitive workload on a smartphone. The goal of this research
          is to understand how touch typing behavior predicts cognitive stress.
          Your participation will help us achieve this goal. The results of this
          research may be presented at scientific or professional meetings or
          published in scientific proceedings and journals.
        </p>
      </div>
      <div className="pageBreak">
        <h3>2. Participation and Compensation</h3>
        <p>
          Your participation in this user study is completely voluntary. You
          will be one of approximately 20 people being tested for this research.
          You will receive no compensation for your participation. You may
          withdraw and discontinue participation at any time without penalty. If
          you decline to participate or withdraw from the user study, no one on
          the campus will be told. You can still demand a certificate of
          participation. The investigator may withdraw you from this research if
          continued participation will not meet the study goals or affect your
          well-being.
        </p>
      </div>
      <div className="pageBreak">
        <h3>3. Procedure</h3>
        <p>
          After confirming the informed consent the procedure is as follows:
        </p>
        <div className="mt-2 mb-2" style={{ paddingLeft: 10, paddingTop: 0 }}>
          <p>
            1. You will see a short questionnaire for you to fill out.
            <br />
            2. You will have about 4 minutes to get used to this smartphone's
            keyboard by typing out given sentences into a text field.
            <br />
            3. In multiple rounds, you have to type out given texts while
            solving a cognitive task.
            <br />
            4. This procedure will repeat multiple times with varying task
            difficulty.
          </p>
        </div>
        <p>
          The complete procedure of this user study will last approximately 20
          minutes.
        </p>
      </div>
      <div className="pageBreak">
        <h3>4. Risks and Benefits</h3>
        <p>
          There are no risks associated with this user study. Discomforts or
          inconveniences will be minor and are not likely to happen. If any
          discomforts become a problem, you may discontinue your participation.
          In order to minimize any risk of infection, hygiene regulations of the
          Humboldt University of Berlin apply and must be followed. Any
          violations of the hygiene regulations or house rules of this
          institution can mean immediate termination of the study. If you get
          injured as a direct result of participation in this research, please
          reach out to the principal investigator. Enrolled students are
          automatically insured against the consequences of accidents through
          statutory accident insurance and with private liability insurance in
          case of any damages. You will not directly benefit through
          participation in this user study. We hope that the information
          obtained from your participation may help to bring forward the
          research in this field. The confirmation of participation in this
          study can be obtained directly from the researchers.
        </p>
      </div>
      <div className="pageBreak">
        <h3>5. Data Protection and Confidentiality</h3>
        <p>
          We are planning to publish our results from this and other sessions in
          scientific articles or other media. These publications will neither
          include your name nor cannot be associated with your identity. Any
          demographic information will be published anonymized and in aggregated
          form. Contact details (such as e-mails) can be used to track potential
          infection chains or to send you further details about the research.
          Your contact details will not be passed on to other third parties. Any
          data or information obtained in this user study will be treated
          confidentially, will be saved encrypted, and cannot be viewed by
          anyone outside this research project unless we have you sign a
          separate permission form allowing us to use them. All data you provide
          in this user study will be subject of the General Data Protection
          Regulation (GDPR) of the European Union (EU) and treated in compliance
          with the GDPR. Subsequent uses of records and data will be subject to
          standard data use policies, which protect the full anonymity of the
          participating individuals. Faculty and administrators from the campus
          will not have access to raw data or transcripts. This precaution will
          prevent your individual comments from having any negative
          repercussions. During the study, we log experimental data, and take
          notes during the user study. Raw data and material will be retained
          securely and compliance with the GDPR, for no longer than necessary or
          if you contact the researchers to destroy or delete them immediately.
          As with any publication or online-related activity, the risk of a
          breach of confidentiality or anonymity is always possible. According
          to the GDPR, the researchers will inform the participant if a breach
          of confidential data was detected.
        </p>
      </div>
      <div className="pageBreak">
        <h3>6. Identification of Investigators</h3>
        <p>
          If you have any questions or concerns about the research, please feel
          free to contact:
        </p>
        <div className="row mt-2 mb-2">
          <div>
            <p>
              Prof. Dr. Thomas Kosch
              <br />
              Principal Investigator
              <br />
              Rudower Chaussee 25
              <br />
              12489 Berlin, Germany
              <br />
              thomas.kosch@hu-berlin.de
            </p>
          </div>
          <br />
        </div>
      </div>
      <div className="pageBreak">
        <h3>7. Informed Consent and Agreement</h3>
        <p>
          This consent form will be retained securely and in compliance with the
          GDPR for no longer than necessary.
        </p>
        <FormControlLabel
          style={{ display: "table" }}
          control={
            <p style={{ display: "table-cell" }}>
              <Checkbox
                onChange={(e) =>
                  setBoxesChecked(
                    update(boxesChecked, { 0: { $set: e.target.checked } })
                  )
                }
              />
            </p>
          }
          label={
            <p className={"required"}>
              I understand the explanation provided to me. I understand that
              this declaration of consent is revocable at any time. I have had
              all my questions answered to my satisfaction, and I voluntarily
              agree to participate in this user study.
            </p>
          }
        />
        <FormControlLabel
          style={{ display: "table" }}
          control={
            <p style={{ display: "table-cell" }}>
              <Checkbox
                onChange={(e) =>
                  setBoxesChecked(
                    update(boxesChecked, { 1: { $set: e.target.checked } })
                  )
                }
              />
            </p>
          }
          label={
            <p className={"required"}>
              I agree that the researchers will take notes during the user
              study. I understand that all data will be treated confidentially
              and in compliance with the GDPR. I understand that the material
              will be anonymized and cannot be associated with my name. I
              understand that full anonymity cannot be guaranteed and a breach
              of confidentiality is always possible. From the consent of
              publication, I cannot derive any rights (such as any explicit
              acknowledgment, financial benefit, or co-authorship). I understand
              that the material can be published worldwide and may be the
              subject of a press release linked to social media or other
              promotional activities. Before publication, I can revoke my
              consent at any time. Once the material has been committed to
              publication it will not be possible to revoke the consent.
            </p>
          }
        />
      </div>
      {showFormHelper && (
        <div className="alert alert-danger" role="alert">
          Please check the required boxes above.
        </div>
      )}
      <Link
        to={"/form"}
        className="btn btn-outline-dark d-flex justify-content-center"
        onClick={!boxesChecked.every(Boolean) && handleClick}
      >
        Submit
      </Link>
    </div>
  );
}

export default Consent;
