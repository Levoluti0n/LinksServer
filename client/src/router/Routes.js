import React from "react";
import { Route, Routes as Switch, Navigate } from "react-router-dom";

import CreateScreen from "../screens/CreateScreen";
import DetailScreen from "../screens/DetailScreen";
import LinksScreen from "../screens/LinksScreen";
import AuthScreen from "../screens/AuthScreen";

export default function Routes(isLogged) {
  if (isLogged) {
    return (
      <Switch>
        <Route path="/links" element={<LinksScreen />} exact />
        <Route path="/create" element={<CreateScreen />} exact />
        <Route path="/detail/:id" element={<DetailScreen />} />
        <Route path="*" element={<Navigate to="/create" />} />
      </Switch>
    );
  }
  return (
    <Switch>
      <Route path="/" element={<AuthScreen />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Switch>
  );
}
