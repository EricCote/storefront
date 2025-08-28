import { ProductListByCollectionDocument } from "@/gql/graphql";
import { executeGraphQL } from "@/lib/graphql";
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
	title: "SD Variations - Boutique",
	description:
		"Fournisseur de matériel érotique et de jouets intimes de haute qualité, spécialisé dans la vente en ligne de produits pour adultes. Découvrez notre sélection de jouets érotiques, lingerie sexy, et accessoires intimes pour pimenter votre vie amoureuse.",
};

export default async function Page(props: { params: Promise<{ channel: string }> }) {
	const params = await props.params;
	const data = await executeGraphQL(ProductListByCollectionDocument, {
		variables: {
			slug: "featured-products",
			channel: params.channel,
		},
		revalidate: 60,
	});

	if (!data.collection?.products) {
		return null;
	}

	const products = data.collection?.products.edges.map(({ node: product }) => product);

	return (
		<section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
	);
}
