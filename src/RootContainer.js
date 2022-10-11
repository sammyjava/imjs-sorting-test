import React from 'react';
import { useState, useEffect } from 'react';
import Loader from './common/loader';

import queryChromosomes from "./query/queryChromosomes.js";

export default function RootContainer({ serviceUrl, entity, config }) {
    const [error, setError] = useState(null);
    const [chromosomes, setChromosomes] = useState(null);

    const genome = {
        abbreviation: 'phavu',
        strain: 'G19833',
        assemblyVersion: 'gnm1'
    };

    // adjust these to test sorting
    const orderField = 'length';
    const orderDirection = 'desc';
    
    useEffect(() => {
        queryChromosomes(genome, orderField, orderDirection, serviceUrl)
            .then(chromosomes => {
                setChromosomes(chromosomes);
            })
            .catch(() => {
                setError("Error getting chromosomes.");
            });
    }, []);
    
    if (error) return (
            <div className="rootContainer error">{ error }</div>
    );

    return (
        <div className="rootContainer">
            {chromosomes ? (
                <div>
                    <h2>orderField:{orderField}</h2>
                    <h2>orderDirection:{orderDirection}</h2>
                    <table className="chromosome-table">
                        <tr>
                            <th>objectId</th>
                            <th>name</th>
                            <th>length</th>
                            <th>primaryIdentifier</th>
                        </tr>
                        {chromosomes.map((chromosome) => 
                            <tr>
                                <td>{chromosome.objectId}</td>
                                <td>{chromosome.name}</td>
                                <td>{chromosome.length}</td>
                                <td>{chromosome.primaryIdentifier}</td>
                            </tr>
                        )}
                    </table>
                </div>
            ) : (
		<Loader />
            )}
	</div>
    );
}
