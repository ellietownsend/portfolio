
import styles from "./Refactor.module.css"

export default function RefactoringPage() {
  return (
    <main className={ styles.starWarsFont }>
      <div className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="font-star-wars text-6xl">
          We&apos;ll Be Right Back
        </h1>

        <p className="mt-6 text-lg text-gray-400">
          The site is currently undergoing some refactoring.
        </p>
      </div>
    </main>
  );
}
