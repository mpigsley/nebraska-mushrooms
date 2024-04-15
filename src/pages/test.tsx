import React from 'react';

export default function TestIndex(): JSX.Element {
    const speciesListPath = '/';

    const generateTagLink = (tagString: string, innerText: string) => {
        return (
            <a href={`${speciesListPath}?q=tag:${tagString}`}>{innerText}</a>
        );
    }

    return (
        <>
            <h3>Nebraska Mushrooms</h3>
            <p>To jump straight to the full list of mushrooms, click <a href={speciesListPath}>here</a>!</p>
            <h4>How to use</h4>
            <p>This website allows you to see lists of mushrooms organized by where they are
                found in <a href="/location">Nebraska Parks</a>.</p>
            <p>The list interface allows you to filter the results using any custom search words along with "tags".
                "Tags" are a method of grouping species into different buckets like what season they are found in,
                what they look like, edibility, toxicity, etc.</p>

            <p>For example, if you're interested in gilled mushrooms from Indian Cave State Park,
                simply select the “agaric” tag to see the relevant results.
                See the result {generateTagLink('agaric', 'here')}</p>
            <h5>Seasons</h5>
                <table>
                    <thead>
                        <th>Season</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Link</th>
                    </thead>
                    <tbody>
                    <tr><td>Spring</td><td>March 21,22</td><td>June 19, 20</td><td>{generateTagLink('spring', 'Spring Mushroom List')}</td></tr>
                        <tr><td>Summer</td><td>June 20, 21</td><td>September 21, 22</td><td>{generateTagLink('summer', 'Summer Mushroom List')}</td></tr>
                        <tr><td>Fall</td><td>September 22, 23</td><td>December 20, 21</td><td>{generateTagLink('fall', 'Fall Mushroom List')}</td></tr>
                        <tr><td>Winter</td><td>December 21, 22</td><td>March 19, 20</td><td>{generateTagLink('winter', 'Winter Mushroom List')}</td></tr>
                    </tbody>
                </table>
                <p><a href="https://www.weather.gov/cle/Seasons">Further reading on seasons.</a></p>
                <h4>Edibility</h4>
                <p>Important! Please read our <a href="/articles/concerning-wild-mushroom-edibility/">disclaimer on edibility</a></p>
                <table>
                    <thead>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Link</th>
                    </thead>
                    <tbody>
                        <tr><td>Edible</td><td>Mushrooms generally considered to be edible by <a href='/articles/edibility-sources'>our sources</a></td><td>{generateTagLink('edible', 'List of Mushrooms Considered Edible')}</td></tr>
                        <tr><td>Edible with Caution</td><td>Mushrooms generally considered to be edible with caution by <a href='/articles/edibility-sources'>our sources</a></td><td>{generateTagLink('edible-with-caution', 'List of Mushrooms Considered Edible with Caution')}</td></tr>
                        <tr><td>Poisonous</td><td>Mushrooms generally considered to be poisonous <a href='/articles/edibility-sources'>our sources</a></td><td>{generateTagLink('poisonous', 'List of Mushrooms Considered Poisonous')}</td></tr>
                    </tbody>
                </table>

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