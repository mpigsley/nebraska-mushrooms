import { type PageProps, graphql, type HeadFC } from "gatsby";
import { IGatsbyImageData } from "gatsby-plugin-image";
import * as React from "react";

import { type Tag } from "../utils/tag.util";
import SpeciesPage from "../components/SpeciesPage";
import Seo from "../components/Seo";
import { formatToCentralTime } from "../utils/date.util";

export default function SpeciesProfileTemplate({
	data,
}: Readonly<PageProps<Queries.SpeciesProfileTemplateQuery>>) {
	if (!data.species?.frontmatter) return null;
	const parent = (
		data.species as unknown as {
			parent?: { birthTime?: string; modifiedTime?: string } | null;
		}
	).parent;
	const creationDate = formatToCentralTime(
		parent?.birthTime || "",
	);
	const modifiedDate = formatToCentralTime(
		parent?.modifiedTime || "",
	);

	return (
		<SpeciesPage
			species={{
				id: data.species.id,
				bodyHtml: data.species.html ?? "",
				name: data.species.frontmatter.name ?? undefined,
				scientificName: data.species.frontmatter.scientific_name ?? "",
				taxonomy:
					(data.species.frontmatter.taxonomy?.filter(Boolean) as string[]) ??
					[],
				tags: (data.species.frontmatter.tags?.filter(Boolean) as Tag[]) ?? [],
				externalLinks:
					data.species.frontmatter.external_links
						?.filter(Boolean)
						.map((link) => ({
							name: link?.tag ?? "",
							url: link?.link ?? "",
						})) ?? [],
				references:
					(data.species.frontmatter.references?.filter(Boolean) as string[]) ??
					[],
				photos:
					(data.species?.frontmatter?.photos
						?.map((p) => p?.childImageSharp?.gatsbyImageData)
						.filter(Boolean) as IGatsbyImageData[]) ?? [],
			}}
			observations={data.observations?.edges.map((o) => ({
				id: o.node.id,
				html: o.node.html ?? "",
				inatId: o.node.frontmatter?.inat_id ?? "",
				name: o.node.frontmatter?.name ?? "",
				scientificName: o.node.frontmatter?.scientific_name ?? "",
				dnaBarcodeIts: o.node.frontmatter?.dna_barcode_its ?? "",
				mycomapBlastLink: o.node.frontmatter?.mycomap_blast_link ?? "",
				location: o.node.frontmatter?.location ?? "",
				datePretty: o.node.frontmatter?.date_pretty ?? "",
				uri: o.node.frontmatter?.uri ?? "",
				userId: o.node.frontmatter?.user_id ?? "thefungiproject",
				photos:
					(o.node.frontmatter?.photos
						?.map((p) => p?.childImageSharp?.gatsbyImageData)
						.filter(Boolean) as IGatsbyImageData[]) ?? [],
			}))}
			locations={data.locations.edges.map((l) => ({
				slug: l.node.fields?.slug ?? "",
				title: l.node.frontmatter?.title ?? "",
			}))}
			creationDate={creationDate}
			modifiedDate={modifiedDate}
		/>
	);
}

export const Head: HeadFC<Queries.SpeciesProfileTemplateQuery> = ({
	data,
	location,
}) => {
	const frontmatter = data.species?.frontmatter;
	const prettyName = !!frontmatter?.name
		? `${frontmatter.name} (${frontmatter.scientific_name})`
		: frontmatter?.scientific_name;
	const image = frontmatter?.photos?.[0]?.childImageSharp?.gatsbyImageData;
	return (
		<Seo
			pathname={location.pathname}
			title={prettyName}
			description={data.species?.excerpt}
			image={image}
			type="article"
			jsonLd={{
				"@type": "Taxon",
				name: frontmatter?.scientific_name,
				alternateName: frontmatter?.name || undefined,
				taxonRank: "species",
				description: data.species?.excerpt || undefined,
			}}
		/>
	);
};

export const pageQuery = graphql`
  query SpeciesProfileTemplate(
    $id: String!
    $locationNames: [String!]
    $observations: [String!] = []
  ) {
    locations: allMarkdownRemark(
      filter: { frontmatter: { title: { in: $locationNames } } }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
    species: markdownRemark(id: { eq: $id }) {
      id
      html
      excerpt
      frontmatter {
        name
        scientific_name
        taxonomy
        tags
        external_links {
          link
          tag
        }
        references
        photos {
          childImageSharp {
            id
            gatsbyImageData(height: 480, layout: CONSTRAINED)
          }
        }
      }
      parent {
        ... on File {
          birthTime
          modifiedTime
        }
      }
    }
    observations: allMarkdownRemark(
      filter: {
        frontmatter: {
          inat_id: { in: $observations }
          templateKey: { eq: "observation" }
        }
      }
    ) {
      edges {
        node {
          id
          html
          frontmatter {
            inat_id
            name
            scientific_name
            dna_barcode_its
            mycomap_blast_link
            location
            date_pretty
            uri
            user_id
            photos {
              childImageSharp {
                id
                gatsbyImageData(height: 480, layout: CONSTRAINED)
              }
            }
          }
        }
      }
    }
  }
`;
