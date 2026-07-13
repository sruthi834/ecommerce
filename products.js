export const products = [
    {
        id: "1",
        title: "Sony WH-1000XM5",
        category: "Audio",
        price: 399.99,
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=600&q=80",
        description: "Industry-leading noise canceling headphones with Auto NC Optimizer. Magnificent sound, engineered to perfection with the new Integrated Processor V1."
    },
    {
        id: "2",
        title: "Apple Watch Series 9",
        category: "Wearables",
        price: 399.00,
        image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=600&q=80",
        description: "Smarter, brighter, mightier. The most powerful chip in Apple Watch ever. A magical new way to use your watch without touching the screen."
    },
    {
        id: "3",
        title: "Keychron Q1 Pro",
        category: "Accessories",
        price: 199.00,
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=600&q=80",
        description: "A fully customizable 75% layout custom mechanical keyboard with QMK/VIA support, designed with an all-metal CNC machined body."
    },
    {
        id: "4",
        title: "Logitech MX Master 3S",
        category: "Accessories",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=600&q=80",
        description: "Feel every moment of your workflow with even more precision, tactility, and performance, thanks to Quiet Clicks and an 8,000 DPI track-on-glass sensor."
    },
    {
        id: "5",
        title: "DJI Mini 3 Pro",
        category: "Photography",
        price: 759.00,
        image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=600&q=80",
        description: "The mini-sized, mega-capable DJI Mini 3 Pro is just as powerful as it is portable. Weighing less than 249 g and with upgraded safety features."
    },
    {
        id: "6",
        title: "Bose SoundLink Flex",
        category: "Audio",
        price: 149.00,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
        description: "Packed with exclusive technologies and a custom-engineered transducer for deep, clear, and immersive audio at home or on the go."
    }
];

export function getProductById(id) {
    return products.find(p => p.id === id);
}
