import * as React from "react"
import { Link, PageProps } from "gatsby"
import PageLayout from "../components/PageLayout"

type Form = {
    name: string;
    description: string;
    url: string;
    images: string[];
};

const FormList: Form[] = [
    {
        name: 'Agarics',
        url: '/location/all/?t=agaric',
        description: 'The "Gilled Mushrooms". These mushrooms typically have a stem that raises the cap above the substrate. Underneath the cap are a multitude of flat plates called "gills" that radiate from the stem outwards to the cap margin. The surface of these plates generate spores which promote the reproductive cycle of the mushroom species.',
        images: [
            '/callistosporium-hesleri-9778-5.jpeg',
            'agaricus-leptocaulis-1433-1.jpeg',
            'amanita-flavorubens3.jpeg'
        ]
    },
    {
        name: 'Boletes',
        url: '/location/all/?t=bolete',
        description: 'These mushrooms have a cap and stem and are generally soft, stout, and fleshy. Underneath the cap is a layer of tubes that can be easily separated from the cap in most species.',
        images: [
            '/suillellus-176372550-1.jpeg',
            '/gyroporus-castaneus-175281413-1.jpeg',
            '/cyanoboletus-cyaneitinctus-175279939-5.jpeg'
        ]
    },
    {
        name: 'Chantrelles',
        url: '/location/all/?t=chantrelle',
        description: 'These are trumpet-shaped mushrooms. Although they appear to have gills at first glance, the spore producing surface is not easily separable from the cap and stem, and are actually folding structures rather than true gills. Many are delicious edibles.',
        images: [
            '/cantharellus-chicagoensis-171660161-1.jpeg',
            '/cantharellus-chicagoensis-171660161-3.jpeg',
        ]
    },
    {
        name: 'Disc Fungi',
        url: '/location/all/?t=disc',
        description: 'The discomyetes or "Disc fungi". These mushrooms are generally small and disc to cup shaped, saddle-shaped, folded, or "shucked corn-cob shaped" like the Morel.',
        images: [
            '/chlorencoelia-torta-177571560-4.jpeg',
            '/helvella-crispa-3688-3.jpeg',
            '/morchella-americana1.jpeg',
        ]
    },
    {
        name: 'Polypores',
        url: '/location/all/?t=polypore',
        description: 'These mushrooms have pores on the underside of the cap (polypore = "many pores") and generally grow on wood. The pore surface is generally not separable from the cap and many species are quite tough. Polypores take can take additional descriptive forms, including conks, shelves, rosettes, and crusts.',
        images: [
            '/fuscoporia-gilva-8025-1.jpeg',
            '/trametes-cinnabarina-1124-1.jpeg',
            '/pseudoinonotus-dryadeus1.jpeg',
            '/daedaleopsis-confragosa-3086-5.jpeg'
        ]
    },
    {
        name: 'Conks',
        url: '/location/all/?t=conk',
        description: 'Conks usually don't have a stem, are usually stout, growing on wood, commonly hard perennials. They can have pores, teeth, and sometimes hard, mock gills. Pores can be round, oblonged, angular, or maze-like.',
        images: [
            '/perenniporia-fraxinophila-223890671-1.jpeg',
            '/trametes-lactinea-2519-3.jpeg',
            '/trametes-cinnabarina-1124-1.jpeg',
        ]
    },
    {
        name: 'Shelf Fungi',
        url: '/location/all/?t=shelf',
        description: 'Shelving fungi commonly grow in large groups, have pores or teeth on the underside, and grow on wood.',
        images: [
            'stereum-lobatum-6734-1.jpeg',
            'cerrena-unicolor1.jpeg'
        ]
    },
    {
        name: 'Crust Fungi',
        url: '/location/all/?t=crust',
        description: 'Corticioid. Crust fungi are found growing flat against a surface, generally a downed tree. Pores may be visible. They may also be smooth, wrinkled, soft, hard, wet, or dry. They come in an array of colors can be easily found in most seasons.',
        images: [
            '/biscogniauxia-atropunctata1.jpeg',
            '/xylobolus-frustulatus1.jpeg',
            '/stereum-complicatum-2110-7.jpeg',
        ]
    },
    {
        name: 'Coral Fungi',
        url: '/location/all/?t=coral',
        description: 'As the name suggests, this form is reminiscent of underwater coral structures, generally branching into separate segments as it grows from the base.',
        images: [
            '/artomyces-pyxidatus5.jpeg',
        ]
    },
    {
        name: 'Club Fungi',
        url: '/location/all/?t=club',
        description: 'These mushrooms are club-shaped, are often colorful, generally small.',
        images: [
            '/holwaya-mucida1.jpeg',
            '/ophiocordyceps-variabilis12.jpeg',
            '/cordyceps-tenuipes-4201-1.jpeg',
        ]
    },
    {
        name: 'Toothed Fungi',
        url: '/location/all/?t=toothed',
        description: 'These mushrooms have spore bearing surfaces that are a sharp tooth-shape, similar to stalactites on the roof of a cave.',
        images: [
            '/auriscalpium-vulgare-223889432-3.jpeg',
            '/hericium-coralloides3.jpeg',
            '/hydnum-subtilior-7143-5.jpeg',
        ]
    },
    {
        name: 'Bird\'s Nest Fungi',
        url: '/location/all/?t=nest',
        description: 'These interesting fungi develop cups (or "nests") with visible packets of spores ("eggs"). Raindrops will fall into the cups and the force and expell the spore packets far away from the parent fruiting body.',
        images: [
            '/crucibulum-parvulum-6258-1.jpeg',
        ]
    },
    {
        name: 'Sequestrate Fungi',
        url: '/location/all/?t=sequestrate',
        description: 'These mushrooms produce spores on the inside of their bodies rather than external production. They present themselves as ball, or pear-shaped, and sometimes possess an outer layer that turns into a star shape at the base.',
        images: [
            '/apioperdon-pyriforme4.jpeg',
            '/calvatia-gigantea-6423-1.jpeg',
            '/geastrum-224064918-1.jpeg',
            '/calvatia-cyathiformis-1829-1.jpeg',
        ]
    },
    // {
    //     name: 'Lichen',
    //     url: '/location/all/?t=lichen',
    //     description: 'Lichen are generally found on tree bark, rocks, tombstones, old metal, anywhere they can create a crust on. Lichens are actually a combination of organisms of a fungal base for protection and a photosynthetic organism for food production. Imagine them as small cities where the fungus is farming energy the photobiant.',
    //     images: [
    //         '/fuscoporia-gilva-8025-1.jpeg',
    //     ]
    // },
    // {
    //     name: 'Rust',
    //     url: '/location/all/?t=rust',
    //     description: 'Rusts can be found infecting leaves or fruit. A common and unique rust in Nebraska is Juniper-Apple Rust, which has an interesting lifecycle jumping between Apple trees and Junipers as they mature and reproduce. They generate these bizarre, orange, jelly-like structures on Junipers (including "Eastern Red Cedar").',
    //     images: [
    //         '/fuscoporia-gilva-8025-1.jpeg',
    //     ]
    // },

]

type FormCardProps = {
    form: Form;
};

const FormCard: React.FC<FormCardProps> = ({ form }) => {
    return (
        <>
            {!!form && (
                <>
                    <hr />
                    <h4><Link to={form.url}>{form.name}</Link></h4>
                    <p>{form.description}</p>
                    <div className="key-form-tile-image-container">
                        {form.images.map((filename, index) => (
                            <img
                                key={index}
                                src={`/img/${filename}`}
                                alt={`${form.name}-${index}`}
                                className="key-form-tile-image"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        ))}
                    </div>
                </>
            )}
        </>
    );
};

const Key: React.FC<PageProps> = () => {
    return (
        <PageLayout>
            <div className="container">
                <div className="row">
                    <a href="/">&lt; Back to Home</a>
                    <h2 className="noMargin">Identification Key</h2>
                    <hr />
                    <div>
                        <p>This website allows you to see lists of mushrooms organized by where they are found in Nebraska parks. Links from the below identification key will direct you to different lists of mushrooms that have been surveyed in Nebraska parks. For more advanced queries, please see <Link to="/articles/manual">the website manual</Link>.</p>
                    </div>
                    <div>
                        <h3>Key to Major Forms</h3>
                        <p>A form is a unique shape that any given mushroom can feature. Below are common forms. To identify a mushroom, start here. Does your mushroom match the form? If so, click the name. If it doesn't match, continue on down the list. Keep in mind that fungi forms often overlap and commonly fit into multiple categories.</p>
                        {FormList.map(x => (<FormCard key={x.name} form={x} />))}
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default Key