import * as React from "react"
import { PageProps } from "gatsby"
import PageLayout from "../components/PageLayout"
// @ts-ignore ???
import MycotaImage from '../img/mycota.jpg';

type Partner = {
    name: string;
    url: string;
    imageUrl: string;
};

const partnerList: Partner[] = [
    {
        name: 'Nebraska Game & Parks Commission',
        url: 'https://outdoornebraska.gov/',
        imageUrl: 'https://outdoornebraska.gov/wp-content/themes/axolotl/images/Default_Grey.jpg'
    },
    {
        name: 'Watchable Wildlife Fund',
        url: 'https://outdoornebraska.gov/about/give-back/help-wildlife/wildlife-conservation-fund/',
        imageUrl: 'https://outdoornebraska.gov/wp-content/uploads/2023/03/JH20130627_6287_2x1.jpg'
    },
    {
        name: 'The Nature Conservancy',
        url: 'https://www.nature.org/en-us/',
        imageUrl: 'https://www.nature.org/content/dam/tnc/nature/en/logos/tnc-logo-primary-registered-light-text.svg'
    },
    {
        name: 'Indian Cave State Park',
        url: 'https://outdoornebraska.gov/location/indian-cave/',
        imageUrl: 'https://outdoornebraska.gov/wp-content/uploads/2023/01/EF20220701_283_1440x960.jpg'
    },
    {
        name: 'Niobrara Valley Preserve',
        url: 'https://www.nature.org/en-us/get-involved/how-to-help/places-we-protect/niobrara-valley-preserve/',
        imageUrl: '/static/009621c2f8619e77e1614bbd4ba6cdf7/b2f8c/niobrara-valley-preserve.jpg'
    },
    {
        name: 'Schramm State Park',
        url: 'https://outdoornebraska.gov/location/schramm-park/',
        imageUrl: 'https://static.inaturalist.org/photos/401824830/large.jpg'
    },
    {
        name: 'Fontenelle Forest & Neale Woods',
        url: 'https://fontenelleforest.org/',
        imageUrl: 'https://fontenelleforest.org/wp-content/uploads/2018/04/logo.png'
    },
    {
        name: 'Bellevue University Science Lab',
        url: 'https://www.bellevue.edu/student-support/labs/science-lab',
        imageUrl: 'https://www.bellevue.edu/student-support/labs/images/05-2022-science-lab-hero-image.webp'
    },
    {
        name: 'Mycota Lab',
        url: 'https://mycota.com/',
        imageUrl: MycotaImage
    },
    {
        name: 'Nebraska Mycological Society',
        url: 'https://www.nebmyco.com/',
        imageUrl: '/img/nebmyco.png'
    },
]

type PartnerCardProps = {
    partner: Partner;
};

const PartnerCard: React.FC<PartnerCardProps> = ({ partner }) => {
    return (
        <a
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'block',
                width: '100%',
                height: '400px',
                borderRadius: '8px',
                overflow: 'hidden',
                backgroundImage: `url(${partner.imageUrl})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: 'black',
                position: 'relative',
                marginBottom: '20px'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.6)',
                    color: 'white',
                    padding: '10px',
                    textAlign: 'center',
                }}
            >
                <h3 style={{ margin: 0 }}>{partner.name}</h3>
            </div>
        </a>
    );
};

const About: React.FC<PageProps> = () => {
    return (
        <PageLayout>
            <div className="container">
                <div className="row">
                    <a href="/">&lt; Back to Home</a>
                    <h2 className="noMargin">About</h2>
                    <hr />
                    <div>
                        <p><b>Nebraska Mushrooms</b> emerged from a joint effort by conservation and educational
                            groups, aiming to advance knowledge, enjoyment, and preservation of fungi throughout the state.
                            This project stems from years of field surveys, mycological literature research, software development, DNA
                            sequencing and conservation efforts led by dedicated individuals at the Nebraska Game and Parks Commission.</p>

                        <p>This initiative is proudly funded by the <b>Nebraska Game and Parks Commission</b> and the <b>Nebraska Wildlife Conservation Fund</b>, whose partnerships we are honored to share.</p>

                        <p>As an active research project, this website will always be a work in progress. Our goal is to offer a free, Nebraska-specific field guide as an educational resource for mycologists of all ages and experience levels—now and for generations to come.</p>

                        <p>We extend our heartfelt thanks to everyone who has contributed to this project over the years. Your support has driven its success, benefiting us all. We believe in the power of collaboration over competition in this new age of biotechnology as radical scientists dedicated to the pursuit of truth. Together, we face the humbling reality that we have only just begun to understand the incredible diversity of fungi on our planet.</p>

                        <p>Mycologists: Chance Brueggemann, Derek Zeller, and Gerry Steinauer as <a href="https://www.inaturalist.org/observations?iconic_taxa=Fungi&subview=map&user_id=thefungiproject">thefungiproject</a></p>
                    </div>
                    <hr />
                    <h2>Our Partners</h2>
                    {partnerList.map(x => (<PartnerCard key={x.name} partner={x} />))}
                </div>
            </div>
        </PageLayout>
    )
}

export default About