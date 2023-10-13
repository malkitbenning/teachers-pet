create view pupil_view as
SELECT
    p.pupil_id,
    p.pupil_nickname,
    p.teacher_id,
    DATE(p.last_update) AS last_update_date,
    p.override_score,
    SUM(total_subquery.answer_score) AS calculated_score,
    override_alloc_subquery.support_category as override_support_category,
    override_alloc_subquery.support_allocation_text as override_support_allocation_text
FROM pupil p
LEFT JOIN (
    SELECT so.pupil_id, SUM(a.answer_score) AS answer_score
    FROM selected_option so
    JOIN answer a ON so.answer_id = a.answer_id
    GROUP BY so.pupil_id
) AS total_subquery ON p.pupil_id = total_subquery.pupil_id
left join (
    select p.pupil_id, sam.support_category, sam.support_allocation_text
    from support_allocation_matrix sam
    join pupil p on (p.override_score >= sam.range_minimum and p.override_score <= range_maximum)
) AS override_alloc_subquery on p.pupil_id = override_alloc_subquery.pupil_id
GROUP BY p.pupil_id, p.pupil_nickname, p.teacher_id, p.last_update, p.override_score, 
override_support_category, override_support_allocation_text;