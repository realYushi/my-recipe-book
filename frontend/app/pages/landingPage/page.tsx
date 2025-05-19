import { Button } from "@/components/ui/button"
import { BookOpen, ChefHat, FolderHeart, ShoppingBasket, Star } from "lucide-react"
import { Link } from "react-router"

function LandingPage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#fffaf5] items-center">
            {/* Navbar */}
            <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
                <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-4 md:px-6">
                    <Link to="/" className="flex items-center gap-2 transition-transform hover:scale-105">
                        <BookOpen className="h-6 w-6 text-amber-600" />
                        <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                            My Recipe Book
                        </span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Link to="#features" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
                            Features
                        </Link>
                        <Link to="#testimonials" className="text-sm font-medium text-gray-600 hover:text-amber-600 transition-colors">
                            Testimonials
                        </Link>
                        <Link to="/app/auth/login">
                            <Button
                                variant="outline"
                                className="border-amber-200 text-amber-700 hover:bg-amber-50 hover:text-amber-800 transition-all"
                            >
                                Log In
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full">
                {/* Hero Section */}
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-900/70 to-green-900/70 mix-blend-multiply z-10"></div>
                        <img
                            src="/images/cooking-hero-bg.jpg"
                            alt="Cooking background"
                            className="object-cover object-center w-full h-full"
                        />
                    </div>
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-10 z-10"></div>
                    <div className="container mx-auto max-w-7xl relative z-20 flex flex-col items-center justify-center px-4 md:px-6 py-24 text-center text-white md:py-32 lg:py-40">
                        <div className="animate-fade-in-up">
                            <div className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1 backdrop-blur-sm">
                                <span className="text-sm font-medium text-white">Your Personal Recipe Manager</span>
                            </div>
                            <h1 className="max-w-4xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl bg-gradient-to-r from-amber-200 to-amber-100 bg-clip-text text-transparent drop-shadow-sm">
                                Organize Your Recipes, Ingredients & Cooking Ideas in One Place
                            </h1>
                            <p className="mt-6 max-w-2xl text-lg text-white/90 md:text-xl">
                                Create, edit, and manage your recipes effortlessly. Perfect for home cooks and food lovers!
                            </p>
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 shadow-lg hover:shadow-xl transition-all duration-300 border-0"
                                >
                                    <Link to="/app/auth/register">Sign Up Free</Link>
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                    asChild
                                >
                                    <Link to="/app/auth/login">Log In</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#fffaf5] to-transparent"></div>
                </section>

                {/* Features Section */}
                <section className="py-20 md:py-28" id="features">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6">
                        <div className="mb-16 text-center">
                            <div className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                                Features You'll Love
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                                Everything you need to manage your recipes
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Designed for home cooks who want to organize their culinary creations and inspirations
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-3">
                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-green-50 to-green-100 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in">
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-green-200 opacity-50 transition-transform group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-5 inline-flex rounded-xl bg-green-100 p-3 shadow-sm">
                                        <ChefHat className="h-8 w-8 text-green-600" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Add/Edit Recipes</h3>
                                    <p className="text-gray-600">
                                        Create, update, and organize your favorite recipes with our easy-to-use editor. Add photos,
                                        ingredients, and step-by-step instructions.
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                            Rich text formatting
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                            Photo uploads
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                                            Cooking time calculator
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-50 to-amber-100 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in">
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-200 opacity-50 transition-transform group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-5 inline-flex rounded-xl bg-amber-100 p-3 shadow-sm">
                                        <ShoppingBasket className="h-8 w-8 text-amber-600" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Track Ingredients</h3>
                                    <p className="text-gray-600">
                                        Keep track of your pantry inventory and never run out of essential ingredients again. Create
                                        shopping lists from your recipes.
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                                            Pantry inventory
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                                            Shopping list generator
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-amber-500"></div>
                                            Expiration date tracking
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-b from-orange-50 to-orange-100 p-8 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg animate-fade-in">
                                <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-orange-200 opacity-50 transition-transform group-hover:scale-150"></div>
                                <div className="relative">
                                    <div className="mb-5 inline-flex rounded-xl bg-orange-100 p-3 shadow-sm">
                                        <FolderHeart className="h-8 w-8 text-orange-600" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Personalized Collections</h3>
                                    <p className="text-gray-600">
                                        Organize recipes by cuisine, diet, or occasion to quickly find what you're looking for. Create
                                        custom collections.
                                    </p>
                                    <ul className="mt-4 space-y-2">
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                                            Custom categories
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                                            Smart tagging
                                        </li>
                                        <li className="flex items-center text-sm text-gray-600">
                                            <div className="mr-2 h-1.5 w-1.5 rounded-full bg-orange-500"></div>
                                            Favorites system
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="bg-gradient-to-b from-green-50 to-green-100 py-20 md:py-28" id="testimonials">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6">
                        <div className="mb-16 text-center">
                            <div className="mb-3 inline-block rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-800">
                                Testimonials
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                                Loved by home cooks everywhere
                            </h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                See what our users are saying about their experience with My Recipe Book
                            </p>
                        </div>

                        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
                            <div className="relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="absolute -top-4 left-8 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="mb-6 pt-4 text-lg italic text-gray-600">
                                    "Finally, an app that keeps all my recipes in one place! I love how easy it is to organize my family
                                    favorites. The ingredient tracking feature has been a game-changer for my weekly meal planning."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-full bg-amber-100 ring-2 ring-amber-200">
                                        <img src="https://fakeimg.pl/56x56" alt="User avatar" width={56} height={56} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Sarah Johnson</p>
                                        <p className="text-sm text-gray-500">Home Cook, Seattle</p>
                                    </div>
                                </div>
                            </div>

                            <div className="relative rounded-2xl bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                                <div className="absolute -top-4 left-8 flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                                <p className="mb-6 pt-4 text-lg italic text-gray-600">
                                    "The ingredient tracking feature has saved me so many trips to the grocery store. This app is a
                                    game-changer! I can easily plan my meals for the week and know exactly what I need to buy."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 overflow-hidden rounded-full bg-green-100 ring-2 ring-green-200">
                                        <img src="https://fakeimg.pl/56x56" alt="User avatar" width={56} height={56} />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Michael Chen</p>
                                        <p className="text-sm text-gray-500">Food Enthusiast, Chicago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* How It Works */}
                <section className="py-20 md:py-28">
                    <div className="container mx-auto max-w-7xl px-4 md:px-6">
                        <div className="mb-16 text-center">
                            <div className="mb-3 inline-block rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                                Simple Process
                            </div>
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">How It Works</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
                                Get started in minutes and begin organizing your recipe collection
                            </p>
                        </div>

                        <div className="relative">
                            <div className="absolute left-1/2 top-1/2 hidden h-0.5 w-full -translate-x-1/2 -translate-y-1/2 bg-amber-200 lg:block"></div>
                            <div className="grid gap-12 md:grid-cols-3 md:gap-8">
                                <div className="relative flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-2xl font-bold text-white shadow-lg">
                                        1
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Sign Up</h3>
                                    <p className="text-gray-600">
                                        Create your free account in seconds and start building your recipe collection. No credit card
                                        required.
                                    </p>
                                    <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">
                                        Takes less than 1 minute
                                    </div>
                                </div>

                                <div className="relative flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-2xl font-bold text-white shadow-lg">
                                        2
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Add Recipes</h3>
                                    <p className="text-gray-600">
                                        Upload your favorite recipes or create new ones with our simple editor. Import from websites with
                                        one click.
                                    </p>
                                    <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">
                                        Easy-to-use interface
                                    </div>
                                </div>

                                <div className="relative flex flex-col items-center text-center">
                                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-2xl font-bold text-white shadow-lg">
                                        3
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-gray-900">Cook & Enjoy!</h3>
                                    <p className="text-gray-600">
                                        Access your recipes anytime, anywhere, and start cooking delicious meals. Share with friends and
                                        family.
                                    </p>
                                    <div className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">
                                        Available on all devices
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 py-20 md:py-28">
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-10"></div>
                    <div className="container mx-auto max-w-7xl relative z-10 flex flex-col items-center px-4 text-center">
                        <div className="mb-3 inline-block rounded-full bg-white/20 px-4 py-1 backdrop-blur-sm">
                            <span className="text-sm font-medium text-white">Limited Time Offer</span>
                        </div>
                        <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                            Ready to Organize Your Recipes?
                        </h2>
                        <p className="mb-8 max-w-2xl text-lg text-white/90">
                            Join thousands of home cooks who have simplified their cooking experience with My Recipe Book. Sign up
                            today and get access to premium features for free!
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <Button
                                size="lg"
                                className="bg-white text-amber-600 hover:bg-white/90 shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                <Link to="/app/auth/register">Sign Up Free</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-2 border-white/70 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                                asChild
                            >
                                <Link to="#features">Learn More</Link>
                            </Button>
                        </div>
                        <div className="mt-12 grid gap-8 md:grid-cols-3 md:gap-12">
                            <div className="flex flex-col items-center">
                                <div className="mb-2 text-3xl font-bold text-white">10,000+</div>
                                <p className="text-white/80">Recipes Created</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 text-3xl font-bold text-white">5,000+</div>
                                <p className="text-white/80">Happy Users</p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="mb-2 text-3xl font-bold text-white">4.9/5</div>
                                <p className="text-white/80">User Rating</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t bg-white py-12 w-full">
                <div className="container mx-auto max-w-7xl px-4 md:px-6">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="flex flex-col">
                            <Link to="/" className="flex items-center gap-2 mb-4">
                                <BookOpen className="h-6 w-6 text-amber-600" />
                                <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                                    My Recipe Book
                                </span>
                            </Link>
                            <p className="text-sm text-gray-600 mb-4">
                                The ultimate recipe management app for home cooks and food enthusiasts.
                            </p>
                            <div className="flex gap-4">
                                <Link to="/" className="text-gray-400 hover:text-amber-600 transition-colors">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                                <Link to="/" className="text-gray-400 hover:text-amber-600 transition-colors">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                    </svg>
                                </Link>
                                <Link to="/" className="text-gray-400 hover:text-amber-600 transition-colors">
                                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path
                                            fillRule="evenodd"
                                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Features</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Recipe Management
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Meal Planning
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Shopping Lists
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Nutrition Tracking
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Our Team
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Press
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Terms of Service
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/" className="text-sm text-gray-600 hover:text-amber-600 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <p className="text-center text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} My Recipe Book. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default LandingPage;
