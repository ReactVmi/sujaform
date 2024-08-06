import React, { useContext } from "react";
import { FormContext } from "@/pages/form";
//import  {Basic}  from "@/app/components/Forms";
import  Basic  from "@/app/components/Forms/Basic";
import  Success  from "@/app/components/Forms/Success";
import  Workspace  from "@/app/components/Forms/Workspace";

function Step() {
  const { activeStepIndex } = useContext(FormContext);
  let stepContent;
  switch (activeStepIndex) {
    case 0:
      stepContent = <Basic />;
      break;
    case 1:
      stepContent = <Workspace />;
      break;
    case 2:
      stepContent = <Success />;
      break;
    default:
      break;
  }

  return stepContent;
}

export default Step;