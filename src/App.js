import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import {
  CookiesProvider
} from 'react-cookie';

import {
  ToastContainer
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import TopBar from "components/TopBar";
import Footer from "components/Footer";

import MyRoute from "./components/MyRoute";
import Connection from "./modules/Accounts/Connection";
import Inscription from "modules/Accounts/Inscription";
import Missing from "modules/Accounts/Missing";

import Home from "modules/Home";
import Landing from "modules/Landing";
import Profil from "modules/Accounts/Profil";

import Qcm from "modules/Qcms/QcmList";
import TakeQcm from "modules/Qcms/TakeQcm";
import addQcm from "modules/Qcms/CreateQcm";

import Quizz from "modules/Quizz/QuizzList";
import TakeQuizz from "modules/Quizz/TakeQuizz";
import addQuizz from "modules/Quizz/CreateQuizz"

import FlashCards from "modules/Flashcards/FlashCardsList";
import TakeFlashCards from "modules/Flashcards/TakeFlashCards";
import HowCreateFlashCards from "modules/Flashcards/HowCeateFlashCards"
import CreateFcWithText from "modules/Flashcards/CreateFcWithText";
import CreateFcWithPhoto from "modules/Flashcards/CreateFcWithPhoto";

import ClassroomList from "modules/Classroom/ClassroomList";
import MakeClassroom from "modules/Classroom/MakeClassroom";

import Provider from "contexts/UserContext";

// Try to import css in s
import './main.css';


const App = () => (
     <Router>
      
      <ToastContainer/>
      <Provider>
      <CookiesProvider>
      <TopBar />
        <Switch>
          <MyRoute path="/signin" component={Connection} />
          <MyRoute path="/signup" component={Inscription} />
          <MyRoute path="/missing_pwd" component={Missing}/>

          <MyRoute path="/home" component={Home} />
          <MyRoute path="/profil" component={Profil} logged/>

          <MyRoute path="/qcmList" component={Qcm} />
          <MyRoute path="/qcm/:id?" component={TakeQcm} />
          <MyRoute path="/addQcm" component={addQcm} logged />

          <MyRoute path="/quizzList" component={Quizz} />
          <MyRoute path="/quizz/:id?" component={TakeQuizz} />
          <MyRoute path="/addQuizz" component={addQuizz} logged />

          <MyRoute path="/flashcards/:id?" component={TakeFlashCards} />
          <MyRoute path="/flashcardsList" component={FlashCards} />
          <MyRoute path="/createFcHome" component={HowCreateFlashCards} logged />
          <MyRoute path="/createFcText" component = {CreateFcWithText} logged />
          <MyRoute path="/createFcPhoto" component = {CreateFcWithPhoto} logged />


          <MyRoute path="/classroomList" component={ClassroomList} logged/>
          <MyRoute path="/makeClassroom" component={MakeClassroom} logged />

          <MyRoute path="/" component={Landing} />
        </Switch>
      </CookiesProvider>
      </Provider>
      <Footer/>
    </Router>
);
export default App;
