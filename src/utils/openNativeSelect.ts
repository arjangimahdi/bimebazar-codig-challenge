export function openNativeSelect(selectEl: HTMLSelectElement | null | undefined): void {
  if (!selectEl) return
  selectEl.focus()
  try {
    ;(selectEl as unknown as { showPicker?: () => void }).showPicker?.()
  } catch {}
  const rect = selectEl.getBoundingClientRect()
  const init: MouseEventInit = {
    bubbles: true,
    cancelable: true,
    view: window,
    clientX: rect.left + Math.min(20, rect.width / 2),
    clientY: rect.top + Math.min(10, rect.height / 2),
    button: 0,
  }
  setTimeout(() => {
    selectEl.dispatchEvent(new MouseEvent('mousedown', init))
    selectEl.dispatchEvent(new MouseEvent('mouseup', init))
    selectEl.dispatchEvent(new MouseEvent('click', init))
  }, 0)
}
