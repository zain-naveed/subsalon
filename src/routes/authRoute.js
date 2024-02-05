import React from "react";
import { Route, Routes, Redirect, Navigate } from "react-router-dom";
import { publicRoute, privateRoute, ownerRoute } from "./allRoute";
import Layout from "./Layout";
import { useSelector } from "react-redux";
import OwnerDashboard from "../Shared/Components/Dashboards/OwnerDashboard";

function AuthRoute() {
  const { user } = useSelector((state) => state.root);
  
  return (
    <>
      <Routes>
        {!user?.user?.role
          ? publicRoute.map((route, inx) => {
              return (
                <>
                  <Route
                    path={route.path}
                    exact={true}
                    key={inx}
                    element={<Layout {...route} />}
                  />
                  <Route
                    path={"*"}
                    element={<Navigate to="/Login" replace />}
                  />
                </>
              );
            })
          : user?.user?.role == "professional"
          ? privateRoute.map((route, inx) => {
              return (
                <>
                  <Route
                    path={route.path}
                    exact={true}
                    key={inx}
                    element={<Layout {...route} />}
                  />
                  {user?.user?.isProfileComplete &&
                  user?.user?.isSubscription &&
                  user?.user?.isEmailVerified ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/profile" replace />}
                    />
                  ) : user?.user?.isProfileComplete === true ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/plan" replace />}
                    />
                  ) : !user?.user?.isEmailVerified ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/email-authentication" replace />}
                    />
                  ) : (
                    <Route
                      path={"*"}
                      element={<Navigate to="/profile-setup" replace />}
                    />
                  )}
                </>
              );
            })
          : ownerRoute.map((route, inx) => {
              return (
                <>
                  <Route
                    path={route.path}
                    exact={true}
                    key={inx}
                    element={<Layout {...route} />}
                  />

                  {user?.user?.isSaloonProfile &&
                  user?.user?.isSubscription &&
                  user?.user?.isEmailVerified ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/owner/dashboard" replace />}
                    />
                  ) : user?.user?.isSaloonProfile === true ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/plan" replace />}
                    />
                  ) : !user?.user?.isSaloonProfile ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/create-salon" replace />}
                    />
                  ) : !user?.user?.isEmailVerified ? (
                    <Route
                      path={"*"}
                      element={<Navigate to="/email-authentication" replace />}
                    />
                  ) : (
                    <Route
                      path={"*"}
                      element={<Navigate to="/create-salon" replace />}
                    />
                  )}
                </>
              );
            })}
      </Routes>
    </>
  );
}

export default AuthRoute;
