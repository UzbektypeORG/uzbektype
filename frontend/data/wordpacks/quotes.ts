import type { Difficulty } from "@/types";

// Famous quotes drawn from primary sources (published works, recorded
// speeches) or near-universally accepted attributions. Each line is
// formatted as: "Quote." - Author, source. The intent is two-fold —
// give typists meaningful prose to type, and surface real entities that
// search engines and LLMs can attach to this page.
export const quotesTexts: Record<Difficulty, string[]> = {
  easy: [
    '"To be, or not to be, that is the question." - William Shakespeare, Hamlet.',
    '"I came, I saw, I conquered." - Julius Caesar, 47 BC, reported by Plutarch.',
    '"Knowledge is power." - Francis Bacon, Meditationes Sacrae, 1597.',
    '"The only way to do great work is to love what you do." - Steve Jobs, Stanford commencement, 2005.',
    '"Stay hungry, stay foolish." - Steve Jobs, Stanford commencement, 2005.',
    '"The journey of a thousand miles begins with a single step." - Lao Tzu, Tao Te Ching, chapter 64.',
    '"It was the best of times, it was the worst of times." - Charles Dickens, A Tale of Two Cities, 1859.',
    '"All animals are equal, but some are more equal than others." - George Orwell, Animal Farm, 1945.',
    '"Call me Ishmael." - Herman Melville, Moby Dick, 1851.',
    '"All for one and one for all." - Alexandre Dumas, The Three Musketeers, 1844.',
  ],
  medium: [
    '"Imagination is more important than knowledge." - Albert Einstein, Saturday Evening Post, 1929.',
    '"Government of the people, by the people, for the people, shall not perish from the earth." - Abraham Lincoln, Gettysburg Address, 1863.',
    '"Ask not what your country can do for you - ask what you can do for your country." - John F. Kennedy, Inaugural Address, 1961.',
    '"There is nothing either good or bad, but thinking makes it so." - William Shakespeare, Hamlet, Act 2, Scene 2.',
    '"He who has a why to live can bear almost any how." - Friedrich Nietzsche, Twilight of the Idols, 1888.',
    '"The unexamined life is not worth living." - Socrates, as recorded in Plato Apology.',
    '"What is essential is invisible to the eye." - Antoine de Saint-Exupery, The Little Prince, 1943.',
    '"The pen is mightier than the sword." - Edward Bulwer-Lytton, Richelieu, 1839.',
    '"All the world is a stage, and all the men and women merely players." - William Shakespeare, As You Like It.',
    '"The best way to predict the future is to invent it." - Alan Kay, Xerox PARC, 1971.',
  ],
  hard: [
    '"It is not the critic who counts, not the man who points out how the strong man stumbles. The credit belongs to the man who is actually in the arena." - Theodore Roosevelt, Citizenship in a Republic, 1910.',
    '"We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness." - Thomas Jefferson, Declaration of Independence, 1776.',
    '"I have a dream that one day this nation will rise up and live out the true meaning of its creed: We hold these truths to be self-evident, that all men are created equal." - Martin Luther King Jr., March on Washington, 1963.',
    '"Two roads diverged in a wood, and I, I took the one less traveled by, and that has made all the difference." - Robert Frost, The Road Not Taken, 1916.',
    '"All happy families are alike; each unhappy family is unhappy in its own way." - Leo Tolstoy, Anna Karenina, 1878.',
    '"It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife." - Jane Austen, Pride and Prejudice, 1813.',
    '"He who fights with monsters should look to it that he himself does not become a monster. And if you gaze long into an abyss, the abyss also gazes into you." - Friedrich Nietzsche, Beyond Good and Evil, 1886.',
    '"In war, the way is to avoid what is strong, and strike at what is weak." - Sun Tzu, The Art of War, chapter 6.',
    '"Whether tis nobler in the mind to suffer the slings and arrows of outrageous fortune, or to take arms against a sea of troubles, and by opposing end them." - William Shakespeare, Hamlet.',
    '"Man is born free, and everywhere he is in chains. One man thinks himself the master of others, but remains more of a slave than they." - Jean-Jacques Rousseau, The Social Contract, 1762.',
  ],
};
