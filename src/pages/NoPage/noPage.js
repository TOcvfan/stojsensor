import React from "react";
import { useLocation } from "react-router-dom";
import Title from "../../components/title";

function NoPage() {
    let location = useLocation();
    const lan = 'the page ' + location.pathname + ' does not exist'
    return (
        <div>
            <h3>
                <Title>404</Title>
                {lan}
            </h3>
        </div>
    );
}

export default NoPage;