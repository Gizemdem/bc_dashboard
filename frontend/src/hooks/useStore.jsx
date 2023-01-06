import create from 'zustand';
import {persist} from 'zustand/middleware';

export const useStore = create(
    persist((set) => ({
        elements: [],
        addElement: (newElement) => {
            
            set((prev) => (
                {
                elements: [
                    ... prev.elements,
                    newElement
                ]
            }))
        },

        deleteElement: (id) => {
            set((prev) => ({
                elements: prev.elements.filter((elem) => elem['GlobalId'] !== id),
            }))
        },

        updateElement: (element) => {
            set((prev) => ({
                elements: prev.elements.map((elem) => 
                    elem['GlobalId'] === element['GlobalId']
                    ? ({...element}) : elem
                )
            }))
        },
        updateSubset: (modelId, subsetId) => {
            set((prev) => ({
                elements: prev.elements.map((elem) => 
                elem['ModelId'] === modelId
                ? ({...elem, subsetId: subsetId}) : elem
            )}))
        }
    }),
        // second argument for persist()
        {name: 'element-storage'})
)