import * as React from "react"
import { PageProps } from "gatsby"
import PageLayout from "../components/PageLayout"

type Partner = {
    name: string;
    url: string;
    imageUrl: string;
};

const partnerList: Partner[] = [
    {
        name: 'Nebraska Game and Parks Commission',
        url: '#',
        imageUrl: '/img/nebgp.png'
    },
    {
        name: 'Watchable Wildlife Fund',
        url: '#',
        imageUrl: '/img/nebgp.png'
    },
    {
        name: 'Mycota Lab',
        url: 'https://mycota.com/',
        imageUrl: '/img/mycota.png'
    },
    {
        name: 'Bellevue University Science Lab',
        url: 'https://www.bellevue.edu/student-support/labs/science-lab',
        imageUrl: 'https://chatbotaixelp.s3.us-west-1.amazonaws.com/institutes/e43b2143-c43a-4c2e-94f1-07cf2795fc98/chat_theme/1731681558682-937697810.png'
    },
    {
        name: 'Nebraska Mycological Society',
        url: 'https://www.nebmyco.com/',
        imageUrl: '/img/nebmyco.png'
    },
    {
        name: 'Indian Cave State Park',
        url: '#',
        imageUrl: '/img/lactarius-yazooensis-3551-4.jpeg'
    },
    {
        name: 'Fontenelle Forest Lands',
        url: '#',
        imageUrl: ''
    },
    {
        name: 'The Nature Conservancy',
        url: 'https://www.nature.org/en-us/',
        imageUrl: 'https://www.nature.org/content/dam/tnc/nature/en/logos/tnc-logo-primary-registered-light-text.svg'
    },
    {
        name: 'Niobrara Valley Preserve',
        url: 'https://www.nature.org/en-us/get-involved/how-to-help/places-we-protect/niobrara-valley-preserve/',
        imageUrl: ''
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
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
                    <div className="ten columns">
                        <a href="/">&lt; Back to Home</a>
                        <h2 className="noMargin">About Us</h2>
                        <hr />
                        <div>
                        <p>NebraskaMushrooms.org is a product of the collaboration between multiple wildlife and educational organizations with a mission to promote the education, recreation, and conservation of fungi in the state of Nebraska. It is the result of years of field surveys, mycological literature research, software development, DNA sequencing by scientists through Mycota Lab and Bellevue University Lab, and conservation efforts by altruistic legends in the Game and Parks Commission.</p>
                        <p>Funding for this project has been provided through the Nebraska Game and Parks Commission and the Nebraska Wildlife Conservation Fund. For whom, we are honored to partner with.</p>
                        <p>As this project active research, this website will always be a work in progress. Our goal is to provide a Nebraska-specific field guide free of charge as an educational tool for mycologists of all ages and skill levels for decades (and further) to come.</p>
                        <p>We would like to share our thanks to all who have been a part of this project through the years and have contributed to its continued success, through which we all benefit. We value the power of collaboration over competition in a new age of technology as radical scientists devoted to the path of truth-finding. Together we must navigate the overwhelming reality that we have barely scratched the surface in what we know about fungi on our wonderful planet.</p>
                        </div>
                        {partnerList.map(x => (<PartnerCard key={x.name} partner={x} />))}
                    </div>
                </div>
            </div>
        </PageLayout>
    )
}

export default About