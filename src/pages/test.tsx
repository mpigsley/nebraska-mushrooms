import React from 'react';

export default function TestIndex(): JSX.Element {
    const speciesListPath = '/';
    const qParam = 'q='

    return (
        <>
            <h3>Nebraska Mushrooms</h3>
            <h4>How to use</h4>
            <p>This website allows you to see lists of mushrooms organized by where they are found in Nebraska parks. For example, <a href="/location/indian-cave-state-park">here</a> is a list from Indian Cave State Park.</p>
            <p>View a list of surveyed Nebraska parks <a href="/location">here</a></p>
            <p>The list interface allows you to filter the results based on search preferences. For example, if you&#39;re interested in gilled mushrooms from Indian Cave State Park, simply select the “agaric” tag to see the relevant results. See the result <a href="/location/indian-cave-state-park?q=tag:agaric">here</a></p>
            <p>More filter tags include:
                <ul>
                    <li><a href="#season-tags">Season</a></li>
                    <li>Edibility: edible, edible-with-caution, poisonous</li>
                    <li>Fungi forms: agarics, boletes, </li>
                </ul>
            </p>
            <p>Click on one of the tag categories above to learn more about them.</p>
            <h4 id="season-tags">Season Tags</h4>
            <p>Seasons span between the following dates:
                <ul>
                    <li><a href={`${speciesListPath}?q=tag:spring`}>Spring</a></li>
                    <li><a href={`${speciesListPath}?q=tag:summer`}>Summer</a></li>
                    <li><a href={`${speciesListPath}?q=tag:fall`}>Fall</a></li>
                    <li><a href={`${speciesListPath}?q=tag:winter`}>Winter</a></li>
                </ul></p>
            <h4 id="edibility">Edibility</h4>
            <p>Edible
                Edible-with-caution
                poisonous</p>
            <h4 id="major-forms">Major Forms</h4>
            <p>Agaric (Gilled Mushrooms)</p>
            <p>Bolete</p>
            <p>Polypore</p>
            <p>Crust</p>
            <p>Truffle-like</p>
            <p>Disc
                Morels are most closely related to disc fungi. That might seem odd to start, however, imagine each one of the pits in the morel to be a disc, and it’s easy to see the resemblance.</p>
            <p>Sesquetrate fungi</p>

        </>
    );
}