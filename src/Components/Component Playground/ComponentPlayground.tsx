import { useEffect, useRef, useState } from 'react'
import SidebarLayout from '../Layouts/Sidebar Layout/SidebarLayout'
import styles from './style.module.css'

const sections = [
    {
        id: 'basics',
        label: 'Basics',
        description: 'Primary buttons, text inputs, and a simple surface.',
        icon: 'widgets',
    },
    {
        id: 'inputs',
        label: 'Inputs',
        description: 'Focused controls with a stronger state transition.',
        icon: 'tune',
    },
    {
        id: 'surfaces',
        label: 'Surfaces',
        description: 'Raised content containers and grouped actions.',
        icon: 'layers',
    },
] as const

type SectionId = (typeof sections)[number]['id']

const ComponentPlayground = () => {
    const [activeSection, setActiveSection] = useState<SectionId>('basics')
    const sectionRefs = useRef<Record<SectionId, HTMLElement | null>>({
        basics: null,
        inputs: null,
        surfaces: null,
    })

    useEffect(() => {
        sectionRefs.current[activeSection]?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }, [activeSection])

    return (
        <SidebarLayout
            sidebarSlotTop={(collapsed) => (
                <div className={styles['sidebar-panel']} data-collapsed={collapsed ? 'true' : 'false'}>
                    <div>
                        <p className={styles['eyebrow']}>Component Playground</p>
                        <h3 className={styles['title']}>Button states</h3>
                        <p className={styles['subtitle']}>Use the sidebar to jump between the playground sections.</p>
                    </div>
                    <div className={styles['button-stack']} role="group" aria-label="Playground sections">
                        {sections.map((section) => (
                            <button
                                key={section.id}
                                type="button"
                                className={styles['sidebar-button']}
                                aria-pressed={activeSection === section.id}
                                data-state={activeSection === section.id ? 'active' : 'inactive'}
                                title={collapsed ? section.label : undefined}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <div className={styles['button-header']}>
                                    <span className={`${styles['button-icon']} material-symbols-outlined`} aria-hidden="true">{section.icon}</span>
                                    <span className={styles['button-label']}>{section.label}</span>
                                </div>
                                <span className={styles['button-description']}>{section.description}</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            sidebarSlotMain={(collapsed) => (
                <div className={styles['sidebar-note']} data-collapsed={collapsed ? 'true' : 'false'}>
                    <p>Active section</p>
                    <strong>{sections.find((section) => section.id === activeSection)?.label}</strong>
                </div>
            )}
            sidebarSlotBottom={(collapsed) => (
                <div className={styles['sidebar-footer']} data-collapsed={collapsed ? 'true' : 'false'}>
                    <p>Component Playground v1.0</p>
                    <small>Button states and transitions are mirrored from the reference archive.</small>
                </div>
            )}
        >
            <div className={styles['component-playground-content']}>
                <section
                    id="basics"
                    ref={(node) => {
                        sectionRefs.current.basics = node
                    }}
                    className={`${styles['section-card']} ${activeSection === 'basics' ? styles['section-card-active'] : ''}`}
                >
                    <div className={styles['section-header']}>
                        <h2>Basics</h2>
                        <p>Simple buttons and controls with the base interaction language.</p>
                    </div>
                    <div className={styles['control-row']}>
                        <button type="button">Click me!</button>
                        <button type="button">Click me!</button>
                        <button type="button">Click me!</button>
                    </div>
                    <input placeholder="Type here" />
                </section>

                <section
                    id="inputs"
                    ref={(node) => {
                        sectionRefs.current.inputs = node
                    }}
                    className={`${styles['section-card']} ${activeSection === 'inputs' ? styles['section-card-active'] : ''}`}
                >
                    <div className={styles['section-header']}>
                        <h2>Inputs</h2>
                        <p>Focused fields with tighter spacing and a clearer transition state.</p>
                    </div>
                    <textarea placeholder="This is a textarea!" />
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, rerum eligendi blanditiis quis nulla earum optio eos incidunt harum ipsum.
                    </p>
                </section>

                <section
                    id="surfaces"
                    ref={(node) => {
                        sectionRefs.current.surfaces = node
                    }}
                    className={`${styles['section-card']} ${activeSection === 'surfaces' ? styles['section-card-active'] : ''}`}
                >
                    <div className={styles['section-header']}>
                        <h2>Surfaces</h2>
                        <p>A raised card layout that makes the selected state easy to read.</p>
                    </div>
                    <div className={styles['surface']}>
                        <h3>Hello from the playground</h3>
                        <p>This area is meant to show grouped controls and a clearer hierarchy.</p>
                        <div className={styles['control-row']}>
                            <button type="button">Primary</button>
                            <button type="button">Secondary</button>
                            <button type="button">Tertiary</button>
                        </div>
                    </div>
                </section>
            </div>
        </SidebarLayout>
    )
}

export default ComponentPlayground
