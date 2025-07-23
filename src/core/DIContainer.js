/**
 * Dependency Injection Container
 */
class DIContainer {
    constructor() {
        this.dependencies = new Map();
        this.singletons = new Map();
    }

    /**
     * Register a dependency
     */
    register(name, factory, options = {}) {
        this.dependencies.set(name, {
            factory,
            singleton: options.singleton || false,
            dependencies: options.dependencies || []
        });
    }

    /**
     * Register a singleton dependency
     */
    registerSingleton(name, factory) {
        this.register(name, factory, { singleton: true });
    }

    /**
     * Register a transient dependency
     */
    registerTransient(name, factory) {
        this.register(name, factory, { singleton: false });
    }

    /**
     * Resolve a dependency
     */
    resolve(name) {
        const dependency = this.dependencies.get(name);
        if (!dependency) {
            throw new Error(`Dependency '${name}' not found`);
        }

        // Return singleton instance if already created
        if (dependency.singleton && this.singletons.has(name)) {
            return this.singletons.get(name);
        }

        // Resolve dependencies
        const resolvedDependencies = dependency.dependencies.map(dep => this.resolve(dep));

        // Create instance
        const instance = dependency.factory(...resolvedDependencies);

        // Store singleton instance
        if (dependency.singleton) {
            this.singletons.set(name, instance);
        }

        return instance;
    }

    /**
     * Check if dependency is registered
     */
    has(name) {
        return this.dependencies.has(name);
    }

    /**
     * Clear all dependencies
     */
    clear() {
        this.dependencies.clear();
        this.singletons.clear();
    }
}
